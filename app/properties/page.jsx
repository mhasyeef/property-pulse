//import properties from "@/properties.json";
import PropertySearchForm from "@/components/PropertySearchForm";
import Properties from "@/components/Properties";

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
      <Properties />
    </>
  );
};

export default PropertiesPage;
