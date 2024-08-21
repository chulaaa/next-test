'use client'
import React, { useState } from 'react';

interface EducationEntry {
    institutionName: string;
    fieldOfStudy: string;
    degree: string;
    endDate: string;
    location: string;
    isStudent: boolean;
}

const EducationForm: React.FC = () => {
    const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    { institutionName: '', fieldOfStudy: '', degree: '', endDate: '', location: '', isStudent: false },
]);

const [message, setMessage] = useState<string | null>(null);

const addEducationEntry = () => {
    const lastEntry: EducationEntry = educationEntries[educationEntries.length - 1];

    // Ensure all other fields are filled before checking date validation
    if (
        !lastEntry.institutionName ||
        !lastEntry.fieldOfStudy ||
        !lastEntry.degree ||
        !lastEntry.endDate ||
        !lastEntry.location
    ) {
        setMessage('Please complete the current education entry before adding another.');
        return; // Exit early if any field is empty
    }

    // Date validation regex for MM/YY format
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    // Check if the endDate is in a valid MM/YY format
    if (!dateRegex.test(lastEntry.endDate)) {
        setMessage('Please enter a valid date in MM/YY format.');
        return;
    }

    // Split the month and year
    const [month, year] = lastEntry.endDate.split('/').map(Number);

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear() % 100; 

    // Check if the entered date is in the future
    if (year > currentYear || (year === currentYear && month > currentMonth)) {
        setMessage('The date cannot be in the future.');
        return;
    }

    // Add the new entry if all validations pass
    if (educationEntries.length < 3) {
        setEducationEntries([
            ...educationEntries,
            { institutionName: '', fieldOfStudy: '', degree: '', endDate: '', location: '', isStudent: false },
        ]);
        setMessage(null); 
    } else {
        setMessage('You can only add up to three education entries.');
    }
};


// const addEducationEntry = () => {
//     const lastEntry: EducationEntry = educationEntries[educationEntries.length - 1];

//     // Ensure all other fields are filled and the date is valid
//     if (
//         lastEntry.institutionName &&
//         lastEntry.fieldOfStudy &&
//         lastEntry.degree &&
//         lastEntry.endDate &&
//         lastEntry.location
//     ) {
//         if (educationEntries.length < 3) {
//             setEducationEntries([
//                 ...educationEntries,
//                 { institutionName: '', fieldOfStudy: '', degree: '', endDate: '', location: '', isStudent: false },
//             ]);
//             setMessage(null); 
//         } else {
//             setMessage('You can only add up to three education entries.');
//         }
//     } else {
//         setMessage('Please complete the current education entry before adding another.');
//     }

//     // Date validation regex for MM/YY format
//     const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

//     // Check if the endDate is in a valid MM/YY format
//     if (!dateRegex.test(lastEntry.endDate)) {
//         setMessage('Please enter a valid date in MM/YY format.');
//         return;
//     }

//     // Split the month and year
//     const [month, year] = lastEntry.endDate.split('/').map(Number);

//     // Get the current month and year
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth() + 1; 
//     const currentYear = currentDate.getFullYear() % 100; 

//     // Check if the entered date is in the future
//     if (year > currentYear || (year === currentYear && month > currentMonth)) {
//         setMessage('The date cannot be in the future.');
//         return;
//     }
// };

const removeEducationEntry = (index: number) => {
    const updatedEntries = educationEntries.filter((_, i) => i !== index);
    setEducationEntries(updatedEntries);
    setMessage(null); 
};


const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const updatedEntries = educationEntries.map((entry, i) =>
        i === index ? { ...entry, [name]: type === 'checkbox' ? checked : value } : entry
    );

    // Date validation
    if (name === 'endDate') {
        const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const [month, year] = value.split('/').map(Number);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        if (!dateRegex.test(value)) {
            setMessage('Please enter a valid date in MM/YY format.');
        } else if (year > currentYear || (year === currentYear && month > currentMonth)) {
            setMessage('The date cannot be in the future.');
        } else {
            setMessage(null); 
        }
    }

    setEducationEntries(updatedEntries);
};

return (
<div className=" xs:p-4 xs:max-w-2xl xs-0 xs:mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Education</h2>
    <p className="text-gray-600 mb-6">Input your educational background, degrees earned and academic achievements</p>
    {educationEntries.map((entry, index) => (
    <div key={index} className="mb-6 ">
        <h3 className="text-lg mb-4">Education Entry {index + 1}</h3>
        <div className=" grid xs:grid-cols-2 xs:gap-4 mb-4">
            <div className="block pb-4">
            <label htmlFor={`institutionName-${index}`} className="block text-sm text-[#002156]">
                Institution Name
            </label>
            <input
                id={`institutionName-${index}`}
                type="text"
                name="institutionName"
                value={entry.institutionName}
                onChange={(e) => handleChange(index, e)}
                className="border border-[#0061F9] bg-[#F7FCFF] p-2 rounded w-full mt-1 outline-none" 
            />
            </div>

            <div className="block">
            <label htmlFor={`fieldOfStudy-${index}`} className="block text-sm text-[#002156]">
                Field of Study
            </label>
                <input
                id={`fieldOfStudy-${index}`}
                type="text"
                name="fieldOfStudy"
                value={entry.fieldOfStudy}
                onChange={(e) => handleChange(index, e)}
                className="border border-[#0061F9] bg-[#F7FCFF] p-2 rounded w-full mt-1 outline-none"
                />
            </div>
        </div>

        <div className="grid xs:grid-cols-2 xs:gap-4 mb-4">
        <div className="block pb-4">
        <label htmlFor={`degree-${index}`} className="block text-sm text-[#002156]">
            Degree
        </label>
            <input
            id={`degree-${index}`}
            type="text"
            name="degree"
            value={entry.degree}
            onChange={(e) => handleChange(index, e)}
            className="border border-[#0061F9] bg-[#F7FCFF] p-2 rounded w-full mt-1 outline-none"
            />
        </div>

        <div className="block">
        <label htmlFor={`endDate-${index}`} className="block text-sm text-[#002156]">
            End Date
        </label>
            <input
            id={`endDate-${index}`}
            type="text"
            name="endDate"
            placeholder='MM/YY'
            value={entry.endDate}
            onChange={(e) => handleChange(index, e)}
            className="border border-[#0061F9] bg-[#F7FCFF] p-2 rounded w-full mt-1 outline-none"
            />
        </div>
        </div>

        <div className="mb-4">
        <label className="flex items-center">
            <input
            type="checkbox"
            name="isStudent"
            checked={entry.isStudent}
            onChange={(e) => handleChange(index, e)}
            className="mr-2"
            />
            <p className='font-light text-[14px] text-[#002156]'>I am still a student</p>
        </label>
        </div>
        <div className="mb-4">
        <div className="block">
        <label htmlFor={`location-${index}`} className="block text-sm text-[#002156]">
            Location
        </label>
            <input
            id={`location-${index}`}
            type="text"
            name="location"
            value={entry.location}
            onChange={(e) => handleChange(index, e)}
            className="border border-[#0061F9] bg-[#F7FCFF] p-2 rounded w-full mt-1 outline-none"
            />
        </div>
        </div>
    </div>
    ))}

    <div className="flex justify-end gap-4 mt-4">
    {educationEntries.length > 1 && (
        <button
        type="button"
        onClick={() => removeEducationEntry(educationEntries.length - 1)}
        className="text-red-500 hover:text-red-700 text-sm"
        >
        - Remove section
        </button>
    )}
    <button
        type="button"
        onClick={addEducationEntry}
        className="text-blue-500 hover:text-blue-700 text-sm"
    >
        + Add education
    </button>
    </div>

    {message && <p className="text-red-500 mt-2 text-[14px]">{message}</p>}

</div>
);
};

export default EducationForm;
