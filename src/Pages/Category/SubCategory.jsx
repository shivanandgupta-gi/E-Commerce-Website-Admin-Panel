import React, { useContext, useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import { IoMdAdd } from "react-icons/io";
import { MyContext } from "../../App";

const data = [
  {
    category: "Fashion",
    subCategories: [
      {
        name: "Women",
        children: ["Sarees", "Tops", "Jeans"],
      },
      {
        name: "Girls",
        children: ["Kurtas & Suits", "Tops"],
      },
      {
        name: "Men",
        children: [],
      },
    ],
  },
  { category: "Electronics", subCategories: [] },
  { category: "Bags", subCategories: [] },
  { category: "Footwear", subCategories: [] },
];

const SubCategory=()=> {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };
const context =useContext(MyContext)
  return (
    
    <>
      <div className='flex items-center justify-between px-2 py-0 mt-4 mb-6'>
            <h2 className='text-[19px] font-[600] '>Sub Category List
</h2>
            <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
                    <Button className='btn-blue btn-sm ml-auto' onClick={()=>{context.setisOpenFullScreenPanel({
                        open:true,
                        model:'Add New Sub Cat'
                    })}}>
                <IoMdAdd className='text-white text-[18px]'  /> Add New Sub Category
                </Button>
                </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg w-full">
      {data.map((cat, i) => (
        <div key={i} className="mb-2  overflow-hidden">
          <button
            onClick={() => toggleCategory(i)}
            className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 text-md font-semibold"
          >
            {cat.category}
            {openCategory === i ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          {openCategory === i && cat.subCategories.length > 0 && (
            <div className="bg-white px-4 py-2">
              {cat.subCategories.map((sub, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-small">{sub.name}</p>
                  {sub.children.length > 0 && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {sub.children.map((item, cidx) => (
                        <li
                          key={cidx}
                          className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded"
                        >
                          <span>{item}</span>
                          <div className="flex space-x-2">
                            <button className="p-1 rounded-full hover:bg-gray-200 cursor-pointer">
                              <Pencil size={16} className="bg-rgba([0,0,0,0.1])" />
                            </button>
                            <button className="p-1 rounded-full hover:bg-gray-200 cursor-pointer">
                              <Trash2 size={16} className="bg-rgba([0,0,0,0.1])" />
                            </button>
                          </div>

                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
}


export default SubCategory;
