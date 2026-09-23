import { useForm } from "react-hook-form";
function Sidebar({setProducts}) {
  const {
    register,
    handleSubmit,
    reset
  } = useForm();

   const onSubmit = (data) => {
    let id = crypto.randomUUID()
    console.log(id)
    const formData = {...data, id }
    console.log(formData)
    setProducts(prev=>[...prev, formData])
    reset()    
   }

  return (
    <div className="col-span-2 bg-white p-8 rounded-2xl h-fit">
      <div className="header flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Add New Recipie</h1>
        <p>Share your delicious recipe with everyone</p>
      </div>

      <div className="sidebarBody">
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Recipe Name</label>
            <input
            {...register("name", { required: true })}
              type="text"
              placeholder="e.g. Chocolate Cake"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Chef Name</label>
            <input
              type="text"
              {...register("chefName", { required: true })}
              placeholder="e.g. Gordon Ramsay"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="e.g. 15.00"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Prep time</label>
            <input
              type="text"
              {...register("prepTime", { required: true })}
              placeholder="e.g. 45 mins"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Image URL</label>
            <input
              type="url"
              {...register("imgUrl", { required: true })}
              placeholder="https://example.com"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              rows="4"
              {...register("description", { required: true })}
              placeholder="Describe your step-by-step instructions..."
              className="border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200"
          >
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
