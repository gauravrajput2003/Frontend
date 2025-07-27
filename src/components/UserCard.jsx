import React from 'react'

const UserCard = ({user}) => {
const{firstName,lastName,photoUrl,age,gender,about}=user;
      if (!user) {
    console.log("User is undefined, showing loading...");
    return (
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <div className="flex justify-center items-center h-48">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="ml-4">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="user" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
  {age && gender && <p>{age + "," + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-end">
    </div>
      <button className="btn btn-secondary  ">Igonore</button>
      <button className="btn btn-primary">Interested</button>
  </div>
</div>
  )
}

export default UserCard