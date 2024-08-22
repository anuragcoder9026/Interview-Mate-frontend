import React from "react";
import CustomCard from "./postcard"; // Adjust the path as necessary

function CardGrid() {
  return (
    <div className="bg-slate-200 p-2 sm:p-8">
      <div className="relative flex items-center pt-4">
        <h1 className="pl-2 sm:pl-4 md:pl-6 lg:pl-8 text-3xl sm:text-4xl font-serif font-semibold text-gray-800 mr-4">
          Blogs
        </h1>

        <hr className="border-t-2 border-gray-300 w-full sm:w-3/3" />
      </div>
      <div className="relative flex flex-wrap justify-center gap-3 pt-6 pb-6">
        <CustomCard url = "https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1207206237.jpg?resize=1200,800" />
        <CustomCard url = "https://bsmedia.business-standard.com/_media/bs/img/article/2023-06/06/full/1686046036-9475.jpeg"/>
        <CustomCard  url = "https://bsmedia.business-standard.com/_media/bs/img/article/2023-01/04/full/1672841059-0551.jpg"/>
        <CustomCard  url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ryEGO-alF1I_klNYDIhhCjeyIhhTMYNVzA&s"/>
        <CustomCard url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUR35tx4718oGAj4HzB6I63X7LOWQB29qQaw&s"/>
        <CustomCard  url = "https://www.cio.com/wp-content/uploads/2024/04/shutterstock_editorial_2110981163.jpg?quality=50&strip=all"/>
        {/* Add more CustomCard components as needed */}
      </div>
    </div>
  );
}

export default CardGrid;
