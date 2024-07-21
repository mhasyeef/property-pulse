//import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertySearchForm from "@/components/PropertySearchForm";

// async function fetchProperties() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// }

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({});

  //sort by date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div
          className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6
          lg:px-8"
        >
          <PropertySearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
