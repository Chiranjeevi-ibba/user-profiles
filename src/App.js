import { Component } from "react";
import UserProfiles from "./components/UserProfile";
import "./App.css";

const initailUserDetailsList = [
  {
    uniqueNo: 1,
    imageUrl:
      "https://i.pinimg.com/474x/d8/af/58/d8af58e411d0017d5186efb5502f6850.jpg",
    name: "Esther Howard",
    role: "Software Developer",
  },
  {
    uniqueNo: 2,
    imageUrl:
      "https://i.pinimg.com/474x/d8/af/58/d8af58e411d0017d5186efb5502f6850.jpg",
    name: "Floyd Miles",
    role: "Software Developer",
  },
  {
    uniqueNo: 3,
    imageUrl:
      "https://i.pinimg.com/474x/d8/af/58/d8af58e411d0017d5186efb5502f6850.jpg",
    name: "Jacob Jones",
    role: "Software Developer",
  },
  {
    uniqueNo: 4,
    imageUrl:
      "https://i.pinimg.com/474x/d8/af/58/d8af58e411d0017d5186efb5502f6850.jpg",
    name: "Devon Lane",
    role: "Software Developer",
  },
];

class App extends Component {
  state = {
    userDetailsList: initailUserDetailsList,
    searchInput: ""
  }

  onChangeSearchInput = (event) => {
    this.setState({searchInput: event.target.value})
  }

  onDeleteListItem = (uniqueNo) => {
    const {userDetailsList} = this.state
    const filterData = userDetailsList.filter(each => each.uniqueNo !== uniqueNo)
    this.setState({userDetailsList: filterData})
  }

  render() {
    const {userDetailsList, searchInput} = this.state
    const filteredList = userDetailsList.filter(each => {
      return each.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
    })
    return (
      <div className="main-cont">
        <h1>Users List</h1>
        <input
         onChange={this.onChangeSearchInput}
         className="input-field"
         type="search"
         value={searchInput}
           />
        <ul className="App">
          {filteredList.map((each) => (
            <UserProfiles userDetails={each} key={each.uniqueNo} onDeleteListItem={this.onDeleteListItem} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
