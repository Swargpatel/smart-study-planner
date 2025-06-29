import './Subject.css';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Subject() {
    const [showForm, setShowForm] = useState(false);
    const [addNewSubject, setAddNewSubject] = useState('');
    const [subjects, setSubjects] = useState([]);

    // useEffect hook to fetch subjects only once when the component mounts
    useEffect(() => {
        const fetchSubjects = async () => {
            try {

                const response = await axios.get('http://localhost:5000/api/subjects');
                setSubjects(response.data);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        fetchSubjects(); // Call the async function
    }, []); // Empty dependency array means this runs once on mount

    // Function to handle adding a new subject when the form is submitted
    const handleAddSubjectSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)

        if (addNewSubject.trim() === '') {
            alert('Subject name cannot be empty!'); // Provide user feedback
            return;
        }

        try {

            // Ensure the full URL matches your backend server's address and port
            const response = await axios.post('http://localhost:5000/api/subjects', {
                name: addNewSubject,
                tasks: []
            });

            // Update the subjects state with the new subject from the response
            setSubjects((prevSubjects) => [...prevSubjects, response.data]);
            setAddNewSubject(''); // Clear the input field after successful submission
            setShowForm(false); // Hide the form after successful submission

        } catch (error) {

            console.error("Error adding subject:", error);
            alert('Failed to add subject. Please try again.'); // Provide user feedback
        }
    };

    const deleteSubject = (id) => {

        axios.delete(`http://localhost:5000/api/subjects/${id}`).then(

            () => {

                let filterSubjects = subjects.filter((sub) => (sub._id !== id))

                setSubjects(filterSubjects);
            }
        ).catch(
            (error) => console.error(error)
        )
    }

    return (
        <Layout>
            <div className='add-subject'>
                {/* When the image is clicked, show the form */}
                <img src='/add.svg' onClick={() => setShowForm(true)} alt="Add Subject"></img>
                <h2>Add Subject</h2>
            </div>

            {showForm && (
                <form className='subject-form' onSubmit={handleAddSubjectSubmit}> {/* Form submission triggers handleAddSubjectSubmit */}
                    <input
                        className='form-input'
                        style={{ outline: "none" }}
                        autoFocus // Automatically focus the input when the form appears
                        autoComplete='off'
                        name='subject'
                        type='text'
                        placeholder='Enter subject name'
                        value={addNewSubject} // Bind input value to state for clearing
                        onChange={(e) => setAddNewSubject(e.target.value)}
                    />
                    {/* This button is hidden but allows form submission via Enter key */}
                    <button type='submit' style={{ visibility: "hidden" }}>
                        Add
                    </button>
                </form>
            )}

            <ul className='subject-list' style={{ color: "#3d0268" }}>
                {
                    subjects.length > 0 ? (
                        subjects.map((subject) => (
                            // Use subject._id as a unique key for list items, provided by MongoDB
                            <Link to='/tasks' style={{ textDecoration: "none" }}>
                                <li key={subject._id} className='subject-box'>
                                    {subject.name}
                                    <div className='delete' onClick={(e) => {

                                        e.preventDefault(); // to prevent navigating to tasks page when clicking on delete
                                        e.stopPropagation(); // to stop the event from bubbling  as this stops the element from going up to its parent
                                        deleteSubject(subject._id);
                                    }}>
                                        <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M590.514383 488.040949 952.888054 851.125263C981.253371 879.546168 981.11016 925.804176 952.546629 954.423734 923.783934 983.242895 877.825294 983.196523 849.450322 954.76589L487.076651 591.681576 124.70298 954.76589C96.337663 983.186795 50.170204 983.043365 21.606672 954.423734-7.156023 925.604646-7.109798 879.555896 21.265175 851.125263L383.638845 488.040949 21.265175 124.956635C-7.100143 96.53573-6.956932 50.277722 21.606672 21.658164 50.369368-7.160997 96.328008-7.114625 124.70298 21.316008L487.076651 384.400322 849.450322 21.316008C877.815566-7.104897 923.983025-6.961467 952.546629 21.658164 981.309325 50.477252 981.263026 96.526002 952.888054 124.956635L590.514383 488.040949 590.514383 488.040949Z" />
                                        </svg>
                                    </div>
                                </li>
                            </Link>
                        ))
                    ) : (
                        <p style={{ marginLeft: "14px", color: "grey", fontWeight: "lighter" }}>No subjects added yet. Click 'Add Subject' to get started!</p>
                    )
                }
            </ul>
        </Layout>
    );
}

export default Subject;