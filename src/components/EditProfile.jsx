import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const editProfile = ({user}) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about);
  const [photo, setphoto] = useState(user.photoUrl);
  const [Error, setError] = useState();
  const [showToast,setshowToast]=useState(false);

  const dispatch=useDispatch();
  const handleEdit=async()=>{
    try{
        const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,photoUrl:photo,about},{withCredentials:true})
            dispatch(addUser(res?.data?.data));
            setshowToast(true);
           setTimeout(()=>{
setshowToast(false);
            },2000);
    }
    catch(err){
        setError(err.message);
    }
    }

  return (
    <div className="flex justify-center items-start min-h-screen bg-base-200 py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        
        {/* Edit Form Card */}
        <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h2 className="card-title text-3xl font-bold text-center mb-8 text-primary">
              Edit Profile
            </h2>
            
            <div className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium">First Name</span>
                  </label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    className="input input-bordered input-lg w-full" 
                    placeholder="Enter first name" 
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium">Last Name</span>
                  </label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    className="input input-bordered input-lg w-full" 
                    placeholder="Enter last name" 
                  />
                </div>
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium">Age</span>
                  </label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                    className="input input-bordered input-lg w-full" 
                    placeholder="Enter your age"
                    min="18"
                    max="100"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium">Gender</span>
                  </label>
                  <select 
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    className="select select-bordered select-lg w-full"
                  >
                    <option value="">Select gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Photo URL</span>
                </label>
                <input 
                  type="url" 
                  value={photo}
                  onChange={(e) => setphoto(e.target.value)}
                  className="input input-bordered input-lg w-full" 
                  placeholder="https://example.com/your-photo.jpg" 
                />
                {photo && (
                  <div className="mt-2">
                    <img 
                      src={photo} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>

              {/* About */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">About Me</span>
                </label>
                <textarea 
                  value={about}
                  onChange={(e) => setabout(e.target.value)}
                  className="textarea textarea-bordered textarea-lg w-full h-32" 
                  placeholder="Tell us about yourself..."
                  maxLength="500"
                ></textarea>
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    {about.length}/500 characters
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {Error && (
                <div className="alert alert-error">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <span>{Error}</span>
                </div>
              )}

              {/* Save Button */}
              <div className="form-control mt-8">
                <button onClick={handleEdit} className="btn btn-primary btn-lg text-lg font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div className="sticky top-8">
            <h3 className="text-xl font-bold text-center mb-4 text-primary">Preview</h3>
            <UserCard user={{firstName,lastName,age,gender,photoUrl:photo,about}}/>
          </div>
        </div>

      </div>
      <div className="toast toast-top toast-center">
 
{ showToast&& <div className="alert alert-success mt-12">
    <span>profile saved successfully.</span>
  </div>}
</div>
    </div>
  )
}

export default editProfile