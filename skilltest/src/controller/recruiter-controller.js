import Recruiter from '../models/recruiter.js';
import { SkillTest } from '../models/skill-test.js';

const addSkillTest = async (req, res) => {
  try {
    req.body.total_questions = req.body.questions.length;
    // Create a new test document using the request body
    const newTest = req.body;

    // Find the recruiter associated with the current user
    const recruiter = await Recruiter.findOne({ _id: req.currentUser.id });

    if (!recruiter) {
      return res.status(404).json({ errors: [{ msg: 'Recruiter not found' }] });
    }
    console.log(newTest);


    // Add the new test to the existing list of tests for the recruiter
    recruiter.skill_tests.push(newTest);

    // Validate the updated recruiter document against the schema
    const validationResult = recruiter.validateSync();
    if (validationResult) {
      console.log(validationResult);
      return res.status(400).json({ errors: validationResult.errors });
    }


    // Save the updated recruiter document to the database
    await recruiter.save();

    res.status(200).json({ message: 'Skill test added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

const getSkillTestsByRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne(
      { _id: req.currentUser.id },
      { skill_tests: { questions: 0, instructions: 0 } } // Exclude the questions array and instructions from the response
    );

    if (!recruiter) {
      return res.status(404).json({ errors: [{ msg: 'Recruiter not found' }] });
    }

    const skillTests = recruiter.skill_tests;

    res.status(200).json({ skillTests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}
const deleteById = async (req, res) => {
  try {
    const skillTestId = req.params.id;

    // Find the recruiter associated with the current user
    const recruiter = await Recruiter.findOne({ _id: req.currentUser.id });
    if (!recruiter) {
      return res.status(404).json({ errors: [{ msg: 'Recruiter not found' }] });
    }

    // Remove the skill test with the given ID from the skill_tests array
    await recruiter.updateOne({ $pull: { skill_tests: { _id: skillTestId } } });

    res.status(200).json({ message: 'Skill test deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};




export { addSkillTest, getSkillTestsByRecruiter,deleteById };
