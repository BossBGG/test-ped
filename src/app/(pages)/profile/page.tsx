'use client'
import ProfileBreadcrumb from "@/app/(pages)/profile/breadcrumb";
import React, {useEffect, useState} from "react";
// import {getProfile} from "@/app/api/ProfileApi";
import {dismissAlert, showProgress} from "@/app/helpers/Alert";
import {PEAProfile} from "@/types";
import ProfileDetail from "@/app/(pages)/profile/detail";
import SignatureTypeLayout from "@/app/(pages)/profile/signature_type_layout";
import SignatureUpload from "@/app/components/form/SignatureUpload";
import {useBreadcrumb} from "@/app/context/BreadcrumbContext";
import UploadProfile from "@/app/components/form/UploadProfile";

const Profile = () => {
  type signatureType = 'name' | 'file'
  const { setBreadcrumb } = useBreadcrumb();
  const [profile, setProfile] = useState<PEAProfile>({} as PEAProfile);
  const [signatureTypeSelected, setSignatureSelectedType] = useState<signatureType>('name');

  useEffect(() => {
    showProgress()
    setBreadcrumb(<ProfileBreadcrumb/>)
    // getProfile().then(res => {
    //   let data = res.data || {} as PEAProfile
    const data: PEAProfile = {
      code: '512188',
      prefix: 'นางสาว',
      first_name: 'พิมพ์ลักษ์',
      last_name: 'บุญชูกุศล',
      job_position: 'ช่างไฟฟ้า',
      affiliated: 'พนักงาน PEA',
      phone: '088-888-8888',
      email: 'WOM@gmail.com'
    }
    setProfile(data)
    dismissAlert()
    // })
  }, [setBreadcrumb])

  return (
    <div className="">
      <div className="border-1 border-[#E1D2FF] rounded-[20px] p-[20px] flex flex-wrap">
        <div className="w-full mb-3 lg:mb-0 lg:w-1/2 pr-10">
          <div className="flex justify-center mb-3">
            <UploadProfile/>
          </div>

          <div className="text-center text-[#671FAB] font-bold text-[24px] mb-5">
            <div>{profile.code}</div>
            <div>{profile.prefix} {profile.first_name} {profile.last_name}</div>
          </div>

          <ProfileDetail label="รหัสพนักงาน" value={profile.code}/>
          <ProfileDetail label="คำนำหน้าชื่อ" value={profile.prefix}/>
          <ProfileDetail label="ชื่อ - สกุล" value={`${profile.first_name} ${profile.last_name}`}/>
          <ProfileDetail label="ตำแหน่ง" value={profile.job_position}/>
          <ProfileDetail label="สังกัด" value={profile.affiliated}/>
          <ProfileDetail label="เบอร์โทร" value={profile.phone}/>
          <ProfileDetail label="อีเมล" value={profile.email}/>
        </div>

        <div className="w-full lg:w-1/2 bg-[#F7EFFF] p-[20px] rounded-[20px]">
          <div className="font-bold text-[24px] text-center mb-3">ลายเซ็นอิเล็กทรอนิกส์</div>

          <div className="bg-white rounded-[20px] p-4">
            <div className="font-bold mb-3">เลือกรูปแบบลายเซ็น</div>

            <div className="flex flex-wrap text-[#671FAB] mb-5">
              <SignatureTypeLayout active={signatureTypeSelected === 'name'}>
                <label htmlFor="signature_name_type" className="cursor-pointer">
                  <input type="radio" id="signature_name_type"
                         className="mr-2"
                         value={signatureTypeSelected}
                         checked={signatureTypeSelected === 'name'}
                         onChange={() => setSignatureSelectedType('name')}
                  />
                  รูปแบบชื่อ-นามสกุล
                </label>
              </SignatureTypeLayout>

              <SignatureTypeLayout active={signatureTypeSelected === 'file'}>
                <label htmlFor="signature_file_type" className="cursor-pointer">
                  <input type="radio" id="signature_file_type"
                         className="mr-2"
                         value={signatureTypeSelected}
                         checked={signatureTypeSelected === 'file'}
                         onChange={() => setSignatureSelectedType('file')}
                  />
                  ลายเซ็นอัปโหลด
                </label>
              </SignatureTypeLayout>
            </div>

            <div>
              <div className="font-bold mb-3">ตัวอย่าง</div>

              {
                signatureTypeSelected === 'name' ?
                  <div className="border-1 border-[#D0BAE5] text-[20px] rounded-[12px] p-5 flex flex-col items-center justify-center">
                    <div className="text-[#1F2024] mb-3">{profile.first_name} {profile.last_name}</div>
                    <div className="text-[#A6A6A6]">นวธ.5 กอพ.2</div>
                  </div>
                  : <SignatureUpload/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
