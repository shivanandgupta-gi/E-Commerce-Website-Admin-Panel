import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MyContext } from '../../App';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, editData, getData } from '../../../utils/api'; // make sure getData is exported

const EditSubCategort = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [selectVal, setSelectVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formFields, setFormFields] = useState({
    name: '',
    parentCatName: null,
    parentId: null
  });

  useEffect(() => {
    setFormFields({
      name: props?.name || "",
      parentCatName: props?.selectedCatName || null,
      parentId: props?.selectedCat || null
    });
    setSelectVal(props?.selectedCat || "");
    console.log("EditSubCategort id:", props._id);
  }, [props]);

  const context = useContext(MyContext);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectVal(selectedId);
    const selectedItem = props?.catData?.find(item => item._id === selectedId);
    setFormFields(prev => ({
      ...prev,
      parentId: selectedId,
      parentCatName: selectedItem ? selectedItem.name : ""
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name.trim() === '') {
      context?.openAlertBox("error", "please enter category name");
      setIsLoading(false);
      return;
    }
    try {
      const res = await editData(`/api/category/${props._id}`, formFields);
      if (res?.success === true) {
        context?.openAlertBox("success", "Category updated successfully");

        const fresh = await getData("/api/category/getcategory");
        if (!fresh.error && fresh.categories) {
          context.setcategoryData && context.setcategoryData(fresh.categories);
        }

        setEditMode(false);
      } else {
        context?.openAlertBox("error", res.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deletecart = async (id) => {
    if (!id) {
      console.error("No ID passed for delete");
      context?.openAlertBox("error", "Invalid category id");
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteData(`/api/category/${id}`);

      if (res?.success) {
        context?.openAlertBox("success", "Category deleted successfully");
        // Refresh category list after deletion
        const fresh = await getData("/api/category/getcategory");
        if (!fresh.error && fresh.categories) {
          context.setcategoryData (fresh.categories);
        }

      } else {
        context?.openAlertBox("error", res.message || "Delete failed");

      }
    } catch (err) {
      console.error("Delete error:", err);
      context?.openAlertBox("success", "Category deleted successfully");
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <form className="w-full flex items-center gap-3 p-0 px-4" onSubmit={handelsubmit}>
      {editMode ? (
        <div className="flex items-center justify-between py-2 gap-4">
          <div className="w-[150px]">
            <Select
              style={{ zoom: '75%' }}
              className="w-full"
              size="small"
              value={selectVal}
              onChange={handleChange}
              displayEmpty
            >
              {props?.catData?.length !== 0 &&
                props.catData.map((item, index) => (
                  <MenuItem value={item?._id} key={index}>
                    {item?.name}
                  </MenuItem>
                ))}
            </Select>
          </div>

          <input
            type="text"
            name="name"
            value={formFields.name}
            onChange={onChangeInput}
            className="w-50 p-2 py-1 px-2 border rounded-sm text-sm"
          />

          <Button size="small" className="btn-sml" type="submit" variant="contained">
            {isLoading ? <CircularProgress color="inherit" size={18} /> : "Edit"}
          </Button>

          <Button size="small" variant="outlined" onClick={() => setEditMode(false)} type="button">
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <span className="font-[500] text-[14px]">{props?.name}</span>
          <div className="flex items-center gap-2 ml-auto mr-2">
            <Button
              onClick={() => {
                setEditMode(true);
                setSelectVal(props.selectedCat);
              }}
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full"
            >
              <MdOutlineModeEditOutline />
            </Button>

            <Button
              type="button"
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full"
              onClick={() => deletecart(props._id)}
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={18} /> : <RiDeleteBin6Line />}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditSubCategort;
