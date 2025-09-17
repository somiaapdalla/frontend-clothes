// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AvatarScene from "./avatarscene";

// export default function OutfitGenerator() {
//   const [clothes, setClothes] = useState([]);
//   const [selectedShirt, setSelectedShirt] = useState(null);
//   const [selectedPants, setSelectedPants] = useState(null);

//   useEffect(() => {
//     const fetchClothes = async () => {
//       const res = await axios.get("http://localhost:1000/get/clothes");
//       setClothes(res.data);
//     };
//     fetchClothes();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">Mix & Match</h2>

//       <AvatarScene
//         shirtUrl={selectedShirt?.glbUrl}
//         pantsUrl={selectedPants?.glbUrl}
//       />

//       <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//         {clothes.map((item) => (
//           <div key={item._id} className="cursor-pointer text-center">
//             <p className="font-semibold">{item.name}</p>
//             <button
//               onClick={() =>
//                 item.type === "shirt"
//                   ? setSelectedShirt(item)
//                   : setSelectedPants(item)
//               }
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Select {item.type}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
