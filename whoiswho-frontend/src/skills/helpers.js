export function getSkillOptions({allSkills = []} = {}) {
  return allSkills.map(value => ({label: value, value}));
}

export function getSkillValues(options = []) {
  return options.map(getSkillValue);
}

export function getSkillValue({value} = {}) {
  return value;
}
