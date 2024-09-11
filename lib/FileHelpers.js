import * as xlsx from "xlsx"

export const readXLSXtoJSON = async (fileObj) => {
    let json;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, {type: "array"});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json)
        return json
    }
    reader.readAsArrayBuffer(fileObj);

}

export const handleXLSXUpload = (e, stateFunction) => {

    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = xlsx.read(data, {type:'array'});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(sheet);
            stateFunction(jsonData);
        };
        reader.readAsArrayBuffer(file);
    }

}

export const handleCSVUpload = (e, stateFunction) => {
    const file = e.target.files[0]
    if(file){
        
    }
    stateFunction(file)
}

export const excelDateToDate = (serial) => {

    const baseDate = new Date(Date.UTC(1900,0,1));
    const daysOffset = serial - 2;
    return new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);

}

