import React from 'react';


const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, delay }) =>
{
    return (
        <div className={`bg-white rounded-2xl p-6  flex flex-col justify-center items-center border border-teal-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 ${delay}`}>
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-white">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default FeatureCard;