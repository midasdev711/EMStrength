const measures1 = {
  headers: [
    {
      text: '',
      sortable: false,
      value: 'title'
    },
    { text: 'Latest', sortable: false, value: 'latest' },
    { text: '25 May', sortable: false, value: 'date1' },
    { text: '18 May', sortable: false, value: 'date2' },
    { text: '11 May', sortable: false, value: 'date3' }
  ],
  measures: [
    {
      title: 'Alcohol consumption',
      latest: '1 glass',
      date1: '1 glass',
      date2: '1 glass',
      date3: '1 glass',
      is_bold: true
    },
    {
      title: 'Training adherence',
      latest: `I didn't train`,
      date1: `I didn't train`,
      date2: `I didn't train`,
      date3: `I didn't train`,
      is_bold: true
    },
    {
      title: '',
      latest: '',
      date1: '',
      date2: '',
      date3: ''
    },
    {
      title: 'Subjective measures',
      latest: 'Subjective measures',
      date1: 'Subjective measures',
      date2: 'Subjective measures',
      date3: 'Subjective measures',
      is_bold: true
    },
    {
      title: 'Stress',
      latest: 'Highly stressed',
      date1: 'Highly stressed',
      date2: 'Highly stressed',
      date3: 'Highly stressed'
    },
    {
      title: 'Sleep amount',
      latest: 'Less than 7 hours',
      date1: 'Less than 7 hours',
      date2: 'Less than 7 hours',
      date3: 'Less than 7 hours'
    },
    {
      title: 'Sleep quality',
      latest: 'Slept right through the night, 13 nights',
      date1: 'Slept right through the night, 13 nights',
      date2: 'Slept right through the night, 13 nights',
      date3: 'Slept right through the night, 13 nights'
    },
    {
      title: 'Digestion (poo)',
      latest: 'Constipated (5 or less poos in 7 days)',
      date1: 'Constipated (5 or less poos in 7 days)',
      date2: 'Constipated (5 or less poos in 7 days)',
      date3: 'Constipated (5 or less poos in 7 days)'
    },
    {
      title: 'Digestion (gas/bloating)',
      latest: 'No gas or bloating',
      date1: 'No gas or bloating',
      date2: 'No gas or bloating',
      date3: 'No gas or bloating'
    },
    {
      title: 'Hunger',
      latest: 'Stuffed - not getting through the food',
      date1: 'Stuffed - not getting through the food',
      date2: 'Stuffed - not getting through the food',
      date3: 'Stuffed - not getting through the food'
    },
    {
      title: 'Mood',
      latest: 'Feeling very down or snappy',
      date1: 'Feeling very down or snappy',
      date2: 'Feeling very down or snappy',
      date3: 'Feeling very down or snappy'
    },
    {
      title: 'Energy',
      latest: 'Feeling OK',
      date1: 'Feeling OK',
      date2: 'Feeling OK',
      date3: 'Feeling OK'
    },
    {
      title: 'Skin',
      latest: 'Vibrant',
      date1: 'Vibrant',
      date2: 'Vibrant',
      date3: 'Vibrant'
    },
    {
      title: 'Libido',
      latest: 'Small amount of sex drive, could take it or leave it',
      date1: 'Small amount of sex drive, could take it or leave it',
      date2: 'Small amount of sex drive, could take it or leave it',
      date3: 'Small amount of sex drive, could take it or leave it'
    },
    {
      title: 'Training recovery',
      latest: `I wasn't sore and had zero fatigue`,
      date1: `I wasn't sore and had zero fatigue`,
      date2: `I wasn't sore and had zero fatigue`,
      date3: `I wasn't sore and had zero fatigue`
    },
    {
      title: 'Menstrual cycle information',
      latest: 'I have gone through menopause',
      date1: 'I have gone through menopause',
      date2: 'I have gone through menopause',
      date3: 'I have gone through menopause'
    }
  ]
}

const measures2 = {
  headers: [
    {
      text: '',
      sortable: false,
      value: 'title'
    },
    { text: 'Latest', sortable: false, value: 'latest' },
    { text: '04 May', sortable: false, value: 'date1' },
    { text: '27 Apr', sortable: false, value: 'date2' },
    { text: '20 Apr', sortable: false, value: 'date3' }
  ],
  measures: [
    {
      title: 'Alcohol consumption',
      latest: '1 glass',
      date1: '1 glass',
      date2: '1 glass',
      date3: '1 glass',
      is_bold: true
    },
    {
      title: 'Training adherence',
      latest: `I didn't train`,
      date1: `I didn't train`,
      date2: `I didn't train`,
      date3: `I didn't train`,
      is_bold: true
    },
    {
      title: 'Stress',
      latest: 'Highly stressed',
      date1: 'Highly stressed',
      date2: 'Highly stressed',
      date3: 'Highly stressed'
    },
    {
      title: 'Sleep amount',
      latest: 'Less than 7 hours',
      date1: 'Less than 7 hours',
      date2: 'Less than 7 hours',
      date3: 'Less than 7 hours'
    },
    {
      title: 'Sleep quality',
      latest: 'Slept right through the night, 13 nights',
      date1: 'Slept right through the night, 13 nights',
      date2: 'Slept right through the night, 13 nights',
      date3: 'Slept right through the night, 13 nights'
    },
    {
      title: 'Digestion (poo)',
      latest: 'Constipated (5 or less poos in 7 days)',
      date1: 'Constipated (5 or less poos in 7 days)',
      date2: 'Constipated (5 or less poos in 7 days)',
      date3: 'Constipated (5 or less poos in 7 days)'
    },
    {
      title: 'Digestion (gas/bloating)',
      latest: 'No gas or bloating',
      date1: 'No gas or bloating',
      date2: 'No gas or bloating',
      date3: 'No gas or bloating'
    },
    {
      title: 'Hunger',
      latest: 'Stuffed - not getting through the food',
      date1: 'Stuffed - not getting through the food',
      date2: 'Stuffed - not getting through the food',
      date3: 'Stuffed - not getting through the food'
    },
    {
      title: 'Mood',
      latest: 'Feeling very down or snappy',
      date1: 'Feeling very down or snappy',
      date2: 'Feeling very down or snappy',
      date3: 'Feeling very down or snappy'
    },
    {
      title: 'Energy',
      latest: 'Feeling OK',
      date1: 'Feeling OK',
      date2: 'Feeling OK',
      date3: 'Feeling OK'
    },
    {
      title: 'Skin',
      latest: 'Vibrant',
      date1: 'Vibrant',
      date2: 'Vibrant',
      date3: 'Vibrant'
    },
    {
      title: 'Libido',
      latest: 'Small amount of sex drive, could take it or leave it',
      date1: 'Small amount of sex drive, could take it or leave it',
      date2: 'Small amount of sex drive, could take it or leave it',
      date3: 'Small amount of sex drive, could take it or leave it'
    },
    {
      title: 'Training recovery',
      latest: `I wasn't sore and had zero fatigue`,
      date1: `I wasn't sore and had zero fatigue`,
      date2: `I wasn't sore and had zero fatigue`,
      date3: `I wasn't sore and had zero fatigue`
    },
    {
      title: 'Menstrual cycle information',
      latest: 'I have gone through menopause',
      date1: 'I have gone through menopause',
      date2: 'I have gone through menopause',
      date3: 'I have gone through menopause'
    }
  ]
}

const measures = [
  {
    date: '27 Sep',
    'Alcohol consumption': '1 glass',
    'Training adherence': `I didn't train`,
    
    'Stress': 'Highly stressed',
    'Sleep amount': 'Less than 7 hours',
    'Sleep quality': 'Slept right through the night, 13 nights',
    'Digestion (poo)': 'Constipated (5 or less poos in 7 days)',
    'Digestion (gas/bloating)': 'No gas or bloating',
    'Hunger': 'Stuffed - not getting through the food',
    'Mood': 'Feeling very down or snappy',
    'Energy': 'Feeling OK',
    'Skin': 'Vibrant',
    'Libido': 'Small amount of sex drive, could take it or leave it',
    'Training recovery': `I wasn't sore and had zero fatigue`,
    'Menstrual cycle information': 'I have gone through menopause'
  },{
    date: '23 Sep',
    'Alcohol consumption': '1 glass',
    'Training adherence': `I didn't train`,
    
    'Stress': 'Highly stressed',
    'Sleep amount': 'Less than 7 hours',
    'Sleep quality': 'Slept right through the night, 13 nights',
    'Digestion (poo)': 'Constipated (5 or less poos in 7 days)',
    'Digestion (gas/bloating)': 'No gas or bloating',
    'Hunger': 'Stuffed - not getting through the food',
    'Mood': 'Feeling very down or snappy',
    'Energy': 'Feeling OK',
    'Skin': 'Vibrant',
    'Libido': 'Small amount of sex drive, could take it or leave it',
    'Training recovery': `I wasn't sore and had zero fatigue`,
    'Menstrual cycle information': 'I have gone through menopause'
  },{
    date: '20 Sep',
    'Alcohol consumption': '1 glass',
    'Training adherence': `I didn't train`,
    
    'Stress': 'Highly stressed',
    'Sleep amount': 'Less than 7 hours',
    'Sleep quality': 'Slept right through the night, 13 nights',
    'Digestion (poo)': 'Constipated (5 or less poos in 7 days)',
    'Digestion (gas/bloating)': 'No gas or bloating',
    'Hunger': 'Stuffed - not getting through the food',
    'Mood': 'Feeling very down or snappy',
    'Energy': 'Feeling OK',
    'Skin': 'Vibrant',
    'Libido': 'Small amount of sex drive, could take it or leave it',
    'Training recovery': `I wasn't sore and had zero fatigue`,
    'Menstrual cycle information': 'I have gone through menopause'
  },{
    date: '17 Sep',
    'Alcohol consumption': '1 glass',
    'Training adherence': `I didn't train`,
    
    'Stress': 'Highly stressed',
    'Sleep amount': 'Less than 7 hours',
    'Sleep quality': 'Slept right through the night, 13 nights',
    'Digestion (poo)': 'Constipated (5 or less poos in 7 days)',
    'Digestion (gas/bloating)': 'No gas or bloating',
    'Hunger': 'Stuffed - not getting through the food',
    'Mood': 'Feeling very down or snappy',
    'Energy': 'Feeling OK',
    'Skin': 'Vibrant',
    'Libido': 'Small amount of sex drive, could take it or leave it',
    'Training recovery': `I wasn't sore and had zero fatigue`,
    'Menstrual cycle information': 'I have gone through menopause'
  },{
    date: '13 Sep',
    'Alcohol consumption': '1 glass',
    'Training adherence': `I didn't train`,
    
    'Stress': 'Highly stressed',
    'Sleep amount': 'Less than 7 hours',
    'Sleep quality': 'Slept right through the night, 13 nights',
    'Digestion (poo)': 'Constipated (5 or less poos in 7 days)',
    'Digestion (gas/bloating)': 'No gas or bloating',
    'Hunger': 'Stuffed - not getting through the food',
    'Mood': 'Feeling very down or snappy',
    'Energy': 'Feeling OK',
    'Skin': 'Vibrant',
    'Libido': 'Small amount of sex drive, could take it or leave it',
    'Training recovery': `I wasn't sore and had zero fatigue`,
    'Menstrual cycle information': 'I have gone through menopause'
  },{
    date: '10 Sep',
    'Alcohol consumption': '1 glass',
    'Training adherence': `I didn't train`,
    
    'Stress': 'Highly stressed',
    'Sleep amount': 'Less than 7 hours',
    'Sleep quality': 'Slept right through the night, 13 nights',
    'Digestion (poo)': 'Constipated (5 or less poos in 7 days)',
    'Digestion (gas/bloating)': 'No gas or bloating',
    'Hunger': 'Stuffed - not getting through the food',
    'Mood': 'Feeling very down or snappy',
    'Energy': 'Feeling OK',
    'Skin': 'Vibrant',
    'Libido': 'Small amount of sex drive, could take it or leave it',
    'Training recovery': `I wasn't sore and had zero fatigue`,
    'Menstrual cycle information': 'I have gone through menopause'
  },
]

export { measures1, measures2, measures }