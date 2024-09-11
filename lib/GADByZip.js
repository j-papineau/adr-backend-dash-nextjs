export const getCTL = () => {

}

export const trimZips = (json) => {
    for(let i = 0; i < json.length; i++){


        const match = json[i]["Matched location"].match(/^\d+/);
        const zipCode = match ? match[0] : null;

        json[i]["Matched location"] = zipCode;
    }
}