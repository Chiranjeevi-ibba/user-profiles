import './index.css'

const UserProfiles = (props) => {
    const {userDetails, onDeleteListItem} = props
    const {imageUrl, name, uniqueNo, role} = userDetails
    
    const onClickCrossBtn = () => {
        onDeleteListItem(uniqueNo)
    }


    return (
        <li className="li-item">
           <img className="avatar-style" src={imageUrl} alt="avatar" />
           <div className="name-role-cont">
               <h3 className="name-style">{name}</h3>
               <p className="role-style">{role}</p>
           </div>
           <button onClick={onClickCrossBtn} type='button' className='cross-btn'>
           <img className='cross-image' src="https://i.pinimg.com/474x/73/69/2b/73692b0c8f849c85448c92469f3f4128.jpg" alt="cross"/>
           </button>
        </li>
    )
}
export default UserProfiles;