const actionSwitcher = (pay) => {
    switch(pay){
        case 'm2fRatio':
            return "Male to Female Ratio in a Constituency"
        case 'listm':
            return "Number of Male Population in a Constituency"
        case 'listf':
            return "Number of Female Population in a Constituency"
        case 'listo':
            return "Number of Other Population"
        case "p1819m":
            return "Number of Males in 18-19 age group"
        case "p1819f":
            return "Number of Females in 18-19 age group"
        case "p1819o":
            return "Number of Others in 18-19 age group"
        case "epic":
            return "Number of people with valid Voter ID Card"
        case "photo":
            return "Number of people with valid Photo in Voter ID Card"
    }
}

export default actionSwitcher