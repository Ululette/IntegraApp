function calculateAge(birthday) {
    const ageDiff = Date.now() - Date.parse(birthday);
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
}

export default calculateAge;
