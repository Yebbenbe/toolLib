import React, { useState } from 'react';
import '../styles/CreateToolForm.scss';

const CreateToolForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        picture: '',
        description: '',
        deposit: '',
        charge: '',
        di4u: false,
        ownerId: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3005/api/tools', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Tool created successfully:', data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <form className='create-tool__form' onSubmit={handleSubmit}>
            <div className='name-tool__form'>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
            </div>
            <div className='create-tool__picture'>
                <label>
                    Picture URL:
                    <input type="text" name="picture" value={formData.picture} onChange={handleChange} />
                </label>
            </div>
            <div className='create-tool__description'>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                </label>
            </div>
            <div className='create-tool__deposit'>
                <label>
                    Deposit:
                    <input type="number" name="deposit" value={formData.deposit} onChange={handleChange} step="0.01" />
                </label>
            </div>
            <div className='create-tool__charge'>
                <label>
                    Charge:
                    <input type="number" name="charge" value={formData.charge} onChange={handleChange} step="0.01" />
                </label>
            </div>
            <div className='create-tool__DI4U'>
                <label>
                    DI4U:
                    <input type="checkbox" name="di4u" checked={formData.di4u} onChange={handleChange} />
                </label>
            </div>
            <button className='create-tool__submit' type="submit">Submit</button>
        </form>
    );
};

export default CreateToolForm;
