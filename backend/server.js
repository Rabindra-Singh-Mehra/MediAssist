const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Symptom to test mapping
const symptomToTestMap = {
  'headache': [
    'Complete Blood Count (CBC)',
    'CT Scan of Head',
    'MRI of Brain',
    'Lumbar Puncture (Spinal Tap)'
  ],
  'fever': [
    'Complete Blood Count (CBC)',
    'Blood Culture',
    'Urine Culture',
    'Chest X-ray',
    'COVID-19 Test'
  ],
  'cough': [
    'Chest X-ray',
    'Sputum Culture',
    'Pulmonary Function Test',
    'COVID-19 Test',
    'Tuberculosis (TB) Test'
  ],
  'stomach pain': [
    'Complete Blood Count (CBC)',
    'Liver Function Test (LFT)',
    'Abdominal Ultrasound',
    'Endoscopy',
    'Stool Test'
  ],
  'chest pain': [
    'Electrocardiogram (ECG/EKG)',
    'Troponin Test',
    'Chest X-ray',
    'Stress Test',
    'Coronary Angiogram'
  ]
};

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Smart response generator function
function generateSmartResponse(query) {
  const lowerQuery = query.toLowerCase();
  
  // Headache-related queries
  if (lowerQuery.includes('headache') || lowerQuery.includes('head pain')) {
    return `Based on your query about "${query}", here's medical information about headaches:

**Possible Disease Predictions:**
1. **Tension Headache** (Most likely) - Stress, poor posture, eye strain causing dull, constant pain
2. **Migraine** - One-sided throbbing pain with nausea, light/sound sensitivity
3. **Sinus Headache** - Pressure around cheeks/forehead with nasal congestion

**Symptoms Analysis:**
1. **Dull, constant pain** → Usually tension headache from muscle strain
2. **Throbbing, one-sided pain** → Classic migraine pattern
3. **Pressure with nasal stuffiness** → Likely sinus-related

**Recommended Actions:**
1. **Over-the-counter relief** - Acetaminophen (500-1000mg) or ibuprofen (200-400mg) for mild pain
2. **Rest and hydration** - Lie in quiet, dark room; drink water to prevent dehydration
3. **Seek medical care** if sudden severe headache or accompanies fever/stiff neck

**Medical Disclaimer:**
1. This information is not a substitute for professional medical advice
2. Consult healthcare provider for persistent or worsening symptoms`;
  }
  
  // Fever-related queries
  if (lowerQuery.includes('fever') || lowerQuery.includes('temperature')) {
    return `Based on your query about "${query}", here's medical information about fever:

**Possible Disease Predictions:**
1. **Viral Infection** (Most likely) - Common cold, flu, or COVID-19 causing immune response
2. **Bacterial Infection** - Strep throat, urinary tract infection, or pneumonia requiring antibiotics
3. **Inflammatory Condition** - Autoimmune flare-up or heat exhaustion

**Symptoms Analysis:**
1. **Low-grade fever (99-101°F)** → Usually viral infection or mild inflammation
2. **High fever (103°F+)** → More likely bacterial infection or severe viral illness
3. **Fever with specific symptoms** → Sore throat (strep), cough (respiratory), urinary pain (UTI)

**Recommended Actions:**
1. **Medication for comfort** - Acetaminophen (500-1000mg) or ibuprofen (200-400mg) for fever reduction
2. **Hydration and rest** - Drink plenty of fluids; rest to support immune system
3. **Medical attention** if fever >103°F, lasts >3 days, or occurs in infants <3 months

**Medical Disclaimer:**
1. This information is not a substitute for professional medical advice
2. Seek immediate care for high fever with severe symptoms or in young children`;
  }
  
  // Cough-related queries
  if (lowerQuery.includes('cough')) {
    return `Based on your query about "${query}", here's medical information about cough:

**Possible Disease Predictions:**
1. **Viral Infection** (Most likely) - Common cold, flu, or COVID-19 causing respiratory irritation
2. **Allergies/Asthma** - Environmental triggers or underlying respiratory condition
3. **Acid Reflux (GERD)** - Stomach acid irritating throat and causing chronic cough

**Symptoms Analysis:**
1. **Dry, irritating cough** → Usually viral infection, allergies, or acid reflux
2. **Wet/productive cough with mucus** → Bacterial infection or respiratory inflammation
3. **Chronic cough (>8 weeks)** → May indicate asthma, GERD, or other underlying condition

**Recommended Actions:**
1. **Over-the-counter relief** - Dextromethorphan for dry cough or guaifenesin for wet cough
2. **Home remedies** - Stay hydrated, use honey, elevate head when sleeping, avoid irritants
3. **Medical consultation** if cough lasts >3 weeks, produces blood, or causes breathing difficulty

**Medical Disclaimer:**
1. This information is not a substitute for professional medical advice
2. Seek immediate care for cough with shortness of breath, chest pain, or bloody mucus`;
  }
  
  // Stomach-related queries
  if (lowerQuery.includes('stomach') || lowerQuery.includes('nausea') || lowerQuery.includes('vomiting')) {
    return `Based on your query about "${query}", here's medical information about stomach issues:

**Possible Disease Predictions:**
1. **Viral Gastroenteritis** (Most likely) - Stomach flu causing inflammation of digestive tract
2. **Food Poisoning** - Bacterial contamination from improperly handled or stored food
3. **Acid Reflux/GERD** - Stomach acid backing up into esophagus causing discomfort

**Symptoms Analysis:**
1. **Nausea with vomiting/diarrhea** → Likely viral gastroenteritis or food poisoning
2. **Burning sensation after eating** → Usually acid reflux or indigestion
3. **Cramping with bloating** → May indicate gas, food intolerance, or mild infection

**Recommended Actions:**
1. **Medication for symptoms** - Antacids for reflux, loperamide for diarrhea, ginger for nausea
2. **Dietary management** - Start with clear liquids, then bland foods (BRAT diet), avoid irritants
3. **Medical attention** for severe pain, blood in vomit/stool, or dehydration signs

**Medical Disclaimer:**
1. This information is not a substitute for professional medical advice
2. Seek immediate care for severe abdominal pain, bloody vomit, or dehydration symptoms`;
  }
  
  // General/default response
  return `Based on your query about "${query}", here's general medical advice:

**General Guidelines:**
- Listen to your body and rest when needed
- Stay hydrated with adequate water intake
- Maintain a balanced diet and regular exercise
- Practice good hygiene and hand washing
- Get adequate sleep (7-9 hours for adults)

**Common Over-the-Counter Medicines for Mild Symptoms:**

**Pain Relief:**
- **Acetaminophen** (Tylenol) - 500-1000mg every 6 hours (max 4000mg/day)
- **Ibuprofen** (Advil, Motrin) - 200-400mg every 6-8 hours (max 1200mg/day)

**Allergies:**
- **Cetirizine** (Zyrtec) - 10mg once daily
- **Loratadine** (Claritin) - 10mg once daily
- **Diphenhydramine** (Benadryl) - 25-50mg every 4-6 hours (may cause drowsiness)

**Cold/Flu:**
- **Phenylephrine** (Sudafed PE) - 10mg every 4 hours for congestion
- **Guaifenesin** (Mucinex) - 200-400mg every 4-6 hours for mucus
- **Zinc lozenges** - every 2-3 hours at onset of cold symptoms

**General Medicine Safety:**
- Always read labels and follow dosage instructions
- Check for interactions with other medications you take
- Store medicines properly (cool, dry place, away from children)
- Check expiration dates before use
- Consult pharmacist if unsure about medicine interactions

**When to See a Doctor:**
- Symptoms are severe or worsening
- Symptoms last longer than expected
- You have multiple concerning symptoms
- You have underlying health conditions
- You're unsure about your symptoms
- Over-the-counter medicines aren't helping

**Self-Care Tips:**
- Keep a symptom diary to track changes
- Use over-the-counter medications as directed
- Apply first aid for minor injuries
- Practice stress management and mental health care
- Maintain a well-stocked basic medicine cabinet

**Emergency Signs:**
- Difficulty breathing
- Chest pain or pressure
- Severe bleeding
- Loss of consciousness
- Sudden, severe pain
- High fever with confusion

**Important:** This information is not a substitute for professional medical advice. Please consult with a healthcare provider for personalized medical care.`;
}

// Medical chatbot API endpoint
app.post('/api/medical-query', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Query is required' 
      });
    }

    // Create a medical prompt for Hugging Face
    const medicalPrompt = `User Query: "${query}"

Please provide medical information about this query with the following structured format:

**Possible Disease Predictions:**
1. [First prediction]
2. [Second prediction] 
3. [Third prediction if applicable]

**Symptoms Analysis:**
1. [First analysis point]
2. [Second analysis point]
3. [Third analysis point if applicable]

**Recommended Actions:**
1. [First action]
2. [Second action]
3. [Third action if applicable]

**Medical Disclaimer:**
1. This information is not a substitute for professional medical advice
2. Consult healthcare provider for persistent or worsening symptoms

IMPORTANT: Limit each section to exactly 2-3 key points maximum. Be concise and focused. Do not provide more than 3 points under any heading.

Focus on:
- Possible disease predictions based on symptoms
- How symptoms relate to specific diseases
- Typical progression or timeline
- Over-the-counter options for mild symptoms
- Common dosages for adults
- Important warnings or precautions

Please be specific and practical in your response.`;

    // Call Hugging Face API
    let medicalResponse;
    
    try {
      console.log('Calling Hugging Face API...');
      console.log('API Key exists:', !!process.env.HF_API_KEY);
      console.log('Model ID:', process.env.HF_MODEL_ID);
      
      const response = await axios.post(
        `${process.env.HF_API_URL}/${process.env.HF_MODEL_ID}`,
        {
          inputs: medicalPrompt,
          parameters: {
            max_length: 500,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.HF_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Hugging Face response status:', response.status);
      medicalResponse = response.data?.[0]?.generated_text || 'I apologize, but I could not generate a response. Please try again.';
      
    } catch (apiError) {
      console.log('Hugging Face API error:');
      console.log('Error message:', apiError.message);
      console.log('Error response:', apiError.response?.data);
      console.log('Error status:', apiError.response?.status);
      
      // Smart response system based on query analysis
      medicalResponse = generateSmartResponse(query);
    }

    res.json({
      success: true,
      query: query,
      response: medicalResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing medical query:', error);
    console.error('Error details:', error.response?.data || error.message);
    
    // Fallback response when API fails
    const fallbackResponse = `I apologize, but I'm having trouble connecting to the medical AI service right now. 

Regarding your query about: "${query}"

General advice:
- If you're experiencing severe symptoms, please seek immediate medical attention
- Contact a healthcare professional for personalized medical advice
- For non-emergency situations, consider telemedicine services or scheduling an appointment with your doctor

Remember: This information is not a substitute for professional medical care.`;

    res.json({
      success: false,
      query: query,
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      error: 'API service unavailable'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Medical Chatbot API is running',
    timestamp: new Date().toISOString()
  });
});

// Test recommendation endpoint
app.post('/api/recommend-tests', (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of symptoms',
        recommendedTests: []
      });
    }

    // Convert all symptoms to lowercase for case-insensitive matching
    const lowerCaseSymptoms = symptoms.map(symptom => symptom.toLowerCase());
    
    // Find matching tests for all symptoms
    const recommendedTests = new Set();
    
    lowerCaseSymptoms.forEach(symptom => {
      // Check for direct matches
      if (symptomToTestMap[symptom]) {
        symptomToTestMap[symptom].forEach(test => recommendedTests.add(test));
      }
      
      // Check for partial matches (e.g., 'head' in 'headache')
      Object.entries(symptomToTestMap).forEach(([key, tests]) => {
        if (symptom.includes(key) || key.includes(symptom)) {
          tests.forEach(test => recommendedTests.add(test));
        }
      });
    });

    // Convert Set back to array
    const uniqueTests = Array.from(recommendedTests);
    
    if (uniqueTests.length === 0) {
      return res.json({
        success: true,
        message: 'No specific tests recommended based on the provided symptoms',
        recommendedTests: []
      });
    }

    res.json({
      success: true,
      message: 'Recommended tests based on symptoms',
      recommendedTests: uniqueTests
    });
    
  } catch (error) {
    console.error('Error recommending tests:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      recommendedTests: []
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Medical Chatbot server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});
