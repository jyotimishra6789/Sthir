"use client"
import {useState} from "react"
const moods=[
    {emoji:"😄", label:"Very happy"},
    {emoji:"😄", label:"Happy"},
    {emoji:"😄", label:"Neutral"},
    {emoji:"😄", label:"Sad"},
    {emoji:"😄", label:"Very Sad"},

];
export default function MoodSelector(){
    const [selectedMood,setSelectedMood]=useState("");
    const handleSelect=(emoji:string)=>{
        setSelectedMood(emoji);
        localStorage.setItem("sthir-mood",emoji);
    };
    return(
        <div className="bg-white shadow-md border-black rounded-2xl p-5">
            <h2 className="text-xl font-semi-bold text-black mb-3">Select Mood</h2>
            <div className="flexgap-4 justify-between">
                {moods.map((mood)=>(
                    <button key={mood.emoji} onClick={()=>handleSelect(mood.emoji)}
                )

                )}
            </div>
        </div>
    )
}