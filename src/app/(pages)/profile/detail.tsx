import React from "react";

const ProfileDetail: React.FC<{label: string, value: string}> = ({label, value}: {label: string, value: string}) => {
  return (
    <div className="flex mb-2 pb-2 border-b-1 border-b-[#E0E0E0]">
      <div className="w-1/2 text-[#414141]">{label} : </div>
      <div className="w-1/2 font-semibold">{value}</div>
    </div>
  )
}

export default ProfileDetail;
