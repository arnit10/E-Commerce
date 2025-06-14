// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Categories = ({ showSubcategories = false, linkTo = "#" }) => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [categoryName, setCategoryName] = useState("");

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/categories");
//       setCategories(res.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!categoryName.trim()) return alert("Category name is required");

//     try {
//       await axios.post(
//         "http://localhost:5000/api/categories",
//         { name: categoryName },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       );
//       setCategoryName("");
//       setShowForm(false);
//       fetchCategories(); // Refresh list
//     } catch (error) {
//       console.error("Error adding category:", error);
//       alert("Failed to add category");
//     }
//   };

  

//   const handleDelete = async (id) => {
//     if (!id) return alert("Category ID is missing");
//     const confirm = window.confirm("Are you sure you want to delete this category?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/categories/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       });
//       fetchCategories();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       alert("Failed to delete category");
//     }
//   };

//   const handleAddSubcategory = async (categoryId) => {
//   const name = subcategoryInputs[categoryId];
//   if (!name || !name.trim()) return alert("Enter a subcategory name");

//   try {
//     await axios.post("http://localhost:5000/api/subcategories", {
//       name,
//       category: categoryId
//     });
//     setSubcategoryInputs(prev => ({ ...prev, [categoryId]: "" }));
//     fetchSubcategories(categoryId); // Refresh
//   } catch (error) {
//     console.error("Error adding subcategory", error);
//     alert("Failed to add subcategory");
//   }
// };


//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="p-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Manage Categories</h2>

//       <div className="flex justify-between mb-6">
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {showForm ? "Cancel" : "Add Category"}
//         </button>
//       </div>

//       {showForm && (
//         <form
//           onSubmit={handleAddCategory}
//           className="flex flex-col sm:flex-row gap-4 mb-6"
//         >
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             placeholder="Enter category name"
//             className="p-2 border rounded w-full sm:w-auto"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Submit
//           </button>
//         </form>
//       )}

//       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((cat) => (
//           <div key={cat._id} className="border p-4 rounded shadow text-center">
//             <h3 className="text-xl font-semibold">{cat.name}</h3>
//           </div>
//         ))}
//       </div> */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((cat) => (
//           <div key={cat._id} className="border p-4 rounded shadow text-center">
//             <h3 className="text-xl font-semibold">{cat.name}</h3>
//             <button
//               onClick={() => handleDelete(cat._id)}
//               className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = ({ showSubcategories = true }) => {
  const [categories, setCategories] = useState([]);
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const [subcategoryInputs, setSubcategoryInputs] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);

      // For each category, fetch its subcategories
      res.data.forEach((cat) => fetchSubcategories(cat._id));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories for a category
  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/subcategories?categoryId=${categoryId}`
      );
      setSubcategoryMap((prev) => ({ ...prev, [categoryId]: res.data }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Add new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return alert("Category name is required");
    try {
      await axios.post(
        "http://localhost:5000/api/categories",
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setCategoryName("");
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    if (!id) return;
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

//   // Add subcategory to category
//   const handleAddSubcategory = async (categoryId) => {
//     const name = subcategoryInputs[categoryId];
//     if (!name || !name.trim()) return alert("Enter a subcategory name");

//     try {
//       await axios.post("http://localhost:5000/api/subcategories", {
//         name,
//         category: categoryId,
//       });
//       setSubcategoryInputs((prev) => ({ ...prev, [categoryId]: "" }));
//       fetchSubcategories(categoryId); // refresh
//     } catch (error) {
//       console.error("Error adding subcategory", error);
//       alert("Failed to add subcategory");
//     }
//   };

const handleAddSubcategory = async (categoryId) => {
  const name = subcategoryInputs[categoryId];
  if (!name || !name.trim()) return alert("Enter a subcategory name");

  try {
    console.log("Sending subcategory:", { name, category: categoryId });

    await axios.post(
      "http://localhost:5000/api/subcategories",
      {
        name,
        category: categoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    setSubcategoryInputs((prev) => ({ ...prev, [categoryId]: "" }));
    fetchSubcategories(categoryId); // refresh
  } catch (error) {
    console.error("Error adding subcategory", error);
    alert("Failed to add subcategory");
  }
};


  //Delete Subcategories
const handleDeleteSubcategory = async (subcategoryId, categoryId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this subcategory?');
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/subcategories/${subcategoryId}`
        ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    fetchSubcategories(categoryId); // ✅ Pass the correct categoryId
  } catch (error) {
    console.error("Error deleting subcategory", error);
    alert("Failed to delete subcategory");
  }
};



  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Categories</h2>

      {/* Add category toggle and form */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddCategory}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="p-2 border rounded w-full sm:w-auto"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}

      {/* Category + Subcategory display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat._id} className="border p-4 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>

            {/* Subcategory list */}
            {showSubcategories && (
              <div className="mb-3">
                {subcategoryMap[cat._id]?.length > 0 ? (
                  <ul className="text-gray-700 text-sm">
                    {subcategoryMap[cat._id].map((sub) => (
                      <li key={sub._id}>• {sub.name}
                      <button
                        className="ml-2 mt-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteSubcategory(sub._id, cat._id)} // ✅ Pass both IDs
                        >
                        Delete
                       </button>

                      </li>
                      
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm italic">No subcategories</p>
                )}
              </div>
            )}

            {/* Add subcategory form */}
            <div className="flex gap-2 justify-center">
              <input
                type="text"
                value={subcategoryInputs[cat._id] || ""}
                onChange={(e) =>
                  setSubcategoryInputs((prev) => ({
                    ...prev,
                    [cat._id]: e.target.value,
                  }))
                }
                placeholder="Subcategory name"
                className="p-1 border rounded"
              />
              <button
                onClick={() => handleAddSubcategory(cat._id)}
                className="bg-green-600 text-white px-3 rounded"
              >
                Add
              </button>
            </div>

            {/* Delete category button */}
            <button
              onClick={() => handleDelete(cat._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

