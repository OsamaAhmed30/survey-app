import {PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import { useParams } from "react-router-dom";
import router from "../router";

export default function Surveys() {
    const [surveys,setSurveys] = useState([]);
    const [meta,setMeta] = useState([]);
    const [loading,setLoading] = useState(false);
    const {survey_slug} = useParams();


    const getSurveys = (url)=>{
      setLoading(true)
       url  = url || 'survey'
      axiosClient.get(url).then(({data})=>{
        setSurveys(data.data)
        setMeta(data.meta)
        setLoading(false)

      }).catch((err)=>{
        if (err.response) {
          console.log(err.response.data);
        }
      })
    }
    
    useEffect(()=>{
      getSurveys()
    },[])
    const onDeleteClick = (surveyId)=>{
      console.log("deleted");
      axiosClient.delete(`survey/${surveyId}`).then(()=>{
        router.navigate('/surveys')
        getSurveys()
      }).catch((err)=>{
        console.log(err);
      });
      
    }
    const surveyDetails = (survey)=>{
      console.log(id);
     axiosClient.get(`survey/${survey}`)
    }
    const onPageClick = (url)=>{
      getSurveys(url)
    }
    return <PageComponent 
    title={'Surveys'}
   
    buttons={<TButton color="green" to="/surveys/create" >
      <PlusCircleIcon className="h-6 w-6 mr-2"/>
      Create Survey
    </TButton>
    } >
        {loading&&<div className='flex items-center		 justify-center w-full h-full  '  >
        <div  className={`lds_roller  `}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>}
      {!loading &&  <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {surveys.map((survey)=>{
           return <SurveyListItem  surveyDetails={surveyDetails} survey = {survey} key={survey.id} onDeleteClick ={onDeleteClick}/>
         })}  
        </div>
        <PaginationLinks onPageClick ={onPageClick} meta={meta}/>
      </div>}
         </PageComponent>
         
          
}