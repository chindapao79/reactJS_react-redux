import React, { useState } from 'react'
import { Table } from 'react-bootstrap';

function TestSearchbar() {
    const [searchInput, setSearchInput] = useState("");

    const countries = [

        { name: "Belgium", continent: "Europe" },
        { name: "India", continent: "Asia" },
        { name: "Bolivia", continent: "South America" },
        { name: "Ghana", continent: "Africa" },
        { name: "Japan", continent: "Asia" },
        { name: "Canada", continent: "North America" },
        { name: "New Zealand", continent: "Australasia" },
        { name: "Italy", continent: "Europe" },
        { name: "South Africa", continent: "Africa" },
        { name: "China", continent: "Asia" },
        { name: "Paraguay", continent: "South America" },
        { name: "Usa", continent: "North America" },
        { name: "France", continent: "Europe" },
        { name: "Botswana", continent: "Africa" },
        { name: "Spain", continent: "Europe" },
        { name: "Senegal", continent: "Africa" },
        { name: "Brazil", continent: "South America" },
        { name: "Denmark", continent: "Europe" },
        { name: "Mexico", continent: "South America" },
        { name: "Australia", continent: "Australasia" },
        { name: "Tanzania", continent: "Africa" },
        { name: "Bangladesh", continent: "Asia" },
        { name: "Portugal", continent: "Europe" },
    ];

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        countries.filter((country) => {
            console.log(country.name.match(searchInput));
            return country.name.match(searchInput);
        });
    }
    
    return <div>

        <div className='m-5'>
            <input className='form-control'
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} />

        </div>
        <Table striped borderless hover variant="dark" size='sm'>
            <thead>
                <tr>
                    <th>Country</th>
                    <th>Continent</th>
                </tr>
            </thead>

            <tbody>
                {countries.map((country, i) =>
                    <tr tr key={i} >
                        <td>{country.name}</td>
                        <td>{country.continent}</td>
                    </tr>
                )}
            </tbody>
        </Table>

    </div >
}

export default TestSearchbar