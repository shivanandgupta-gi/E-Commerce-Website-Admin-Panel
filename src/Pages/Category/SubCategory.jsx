import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import { IoMdAdd } from "react-icons/io";
import { MyContext } from "../../App";
import { getData } from "../../../utils/api";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import EditSubCategort from "./EditSubCategort";


const SubCategory=()=> {
  const [openCategory, setOpenCategory] = useState(0);
  //opening for the open togel
  const expend = (index) => {
    if(openCategory === index){
      setOpenCategory(null);
    }else{
      setOpenCategory(index);
    }
  };
  const context =useContext(MyContext);
  //backend
    useEffect(() => {
    // ✅ Always load fresh categories when page opens
    getData("/api/category/getcategory").then((res) => {
      if (!res.error) {
        console.log(res)
        context.setcategoryData(res.categories);
      }
    });
  }, []); // only run when component mounts
  return (
    
    <>
      <div className='flex items-center justify-between px-2 py-0 mt-4 mb-6'>
            <h2 className='text-[19px] font-[600] '>Sub Category List</h2>
            <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
                    <Button className='btn-blue btn-sm ml-auto' onClick={()=>{context.setisOpenFullScreenPanel({
                        open:true,
                        model:'Add New Sub Cat'
                    })}}>
                <IoMdAdd className='text-white text-[18px]'  /> Add New Sub Category
                </Button>
                </div>
          </div>
        
        {/* for creating the list */}
        <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
        {context?.categoryData?.length !== 0 && (
          <ul className="w-full">
            {/* print the category list */}
            {context?.categoryData?.map((firstLevelCat, index) => (
              <li className="w-full mb-1" key={index}>
                <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                  <span className="font-[500] flex items-center gap-4 text-[14px]">
                    {firstLevelCat?.name}
                  </span>
                  {/* for button drop down or open close */}
                  <Button
                    className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                    // Click handler triggers 'expend' function with current index
                    onClick={() => expend(index)}
                  >
                    <FaAngleDown />
                  </Button>
                </div>
                {
                  // this for the when category is open then print sub category inside them category
                  openCategory === index &&
                  <>
                  {/* if inside category present more sub categort */}
                    {firstLevelCat?.children?.length !== 0 && 
                      <ul className="w-full">
                        {firstLevelCat?.children?.map((subCat, index_) => (
                          <li key={index_} className="w-full py-1">
                            <EditSubCategort name={typeof subCat === "string" ? subCat : subCat?.name}
                              _id={subCat?._id}
                              catData={context?.categoryData}
                              index={index_}
                              selectedCat={subCat?.parentId}
                              selectedCatName={subCat?.parentCatName}
                            /> 

                            {/* // for third level category */}
                          {
                            subCat?.children?.length !== 0 && 
                            <ul className="pl-4">
                                {
                                  subCat?.children?.map((thirdLevel,index_)=>{
                                    return(
                                      <li key={index_} className="w-full hover:bg-[#f1f1f1]">
                                        <EditSubCategort name={typeof thirdLevel === "string" ? thirdLevel : thirdLevel?.name}
                                          _id={thirdLevel?._id}
                                          catData={context?.categoryData}
                                          index={index_}
                                          selectedCat={thirdLevel?.parentId}
                                          selectedCatName={thirdLevel?.parentCatName}
                                        /> 
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                          }
                          </li>
                          
                        ))}
                      </ul>
                    }
                  </>
                }
              </li>
            ))}
          </ul>
        )}
      </div>

    </>
  );
}


export default SubCategory;
