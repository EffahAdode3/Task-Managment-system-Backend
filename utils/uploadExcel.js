import Client from "../model/clientModel.js";
import XLSX from "xlsx";

const uploadExcel = async(req,res)=>{
    try{
        const excelBody = req.file.buffer
        const workbook = XLSX.read(excelBody, {type:'buffer'})  
        const jsonBody = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        console.log('Number of rows:', jsonBody.length);
        for(let row of jsonBody){
           
            await Client.create(row)
         
        }
        return res.status(200).json({message:"success"})
    }catch(error){
        console.error(error)
    }
}


export default uploadExcel