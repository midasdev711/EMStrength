const Menu = [
  {
    title: "Recovery To-DO List",
    icon: "filter_vintage",
    name: "Recovery",
    key: "key-Recovery"
  },

  {
    title: "Symptom Checklist",
    icon: "check_box",
    name: "Symptom Checklist",
    key: "key-SymptomChecklist"
  },

  {
    title: "Stress-Recovery Analysis",
    icon: "healing",
    name: "StressRecovery",
    key: "key-RecoveryDiagnostic"
  },

  {
    title: "Decision Profile",
    icon: "favorite",
    name: "Decision Profile",
    key: "key-DecisionProfile"
  },

  {
    title: "About Us",
    icon: "menu_book",
    name: "aboutus",
    key: "key-aboutus"
  },

  {
    title: "Terms & Conditions",
    icon: "menu_book",
    name: "TermsConditions",
    key: "key-TermsConditions"
  },

  {
    title: "Privacy Policy",
    icon: "security",       
    name: "PrivacyPolicy",
    key: "key-PrivacyPolicy"
  },

  {
    title: "Contact Us",
    icon: "mail_outline",
    name: "EnergyHealth_shop",
    href: "https://coaching.site.com.au/",
    key: "key-EnergyHealth"
  }
]
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase()
      let textB = y.title.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
  }
})

export default Menu
