const Menu = [
  {
    title: "Dashboard",
    icon: "dashboard",
    name: "Dashboard",
    key: "key-Dashboard"
  },
  {
    title: "Daily Input - Weight",
    icon: "calendar_today",
    name: "Daily Data - Weight",
    key: "key-Daily Data - Weight"
  },
  {
    title: "Daily Input - Temp & Pulse",
    icon: "favorite_border",
    name: "Daily Data - Temp & Pulse",
    key: "key-Daily Data - Temp & Pulse"
  },
  {
    title: "Weekly Input",
    icon: "show_chart",
    name: "Weekly Data",
    key: "key-Weekly Data"
  },
  {
    title: "Diet History",
    icon: "bar_chart",
    name: "Diet History",
    key: "key-Diet History"
  },
  {
    title: "Food Tracker",
    icon: "track_changes",
    name: "Food Tracker",
    key: "key-Food Tracker"
  },
  {
    title: "Coaching Feedback",
    icon: "chat",
    name: "Coaching Feedback",
    badgeType: "UnreadReceivedMessages",
    key: "key-Coaching Feedback"
  },
  {
    title: "Recipe Builder",
    icon: "restaurant",
    name: "Recipe Builder",
    key: "key-Recipe Builder"
  },
  {
    title: "Energy Health",
    icon: "shopping_basket",
    name: "EnergyHealth_shop",
    href: "https://EnergyHealth.myshopify.com/",
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
