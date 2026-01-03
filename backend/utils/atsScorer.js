export const calculateATSScore = (resumeSkills, jobSkills) => {
  if (jobSkills.length === 0) return 0;

  const matched = resumeSkills.filter(skill =>
    jobSkills.includes(skill)
  );

  return {
    score: Math.round((matched.length / jobSkills.length) * 100),
    matched,
    missing: jobSkills.filter(skill => !resumeSkills.includes(skill))
  };
};
