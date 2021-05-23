import React, {useState, useEffect} from 'react';

const ImportCSVFile = ({setTrades}) => {
    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        // console.log(content)

        try {
            var rows = content.split("\n")
            var data = []
            for (let index = 1; index < rows.length; index++) {
                var element = rows[index];
                var row = element.split(",")
                data.push({
                    "name": row[0].replace(/"/g, ""),
                    "initial": row[1].replace(/"/g, ""),
                    "current": parseFloat(row[2].replace(/"/g, "")),
                    "quantity": parseFloat(row[3].replace(/"/g, "")),
                    "ROI": parseFloat(row[4].replace(/"/g, ""))
                })
            }
            // console.log(data)
            setTrades(data)
        } catch (error) {
            console.log("had trouble reading the data")
        }

    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file)
    }

    return (
        <input 
            type="file"
            id="file"
            className="input-file"
            accept='.csv'
            onChange={e => handleFileChosen(e.target.files[0])}
        />

    );
}

export default ImportCSVFile