//MemberList.jsx//
import { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterNode from './RegisterNode';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/members')
      .then(response => {
        setMembers(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the members!", error);
      });
  }, []);

  return (
    <div>
      <RegisterNode/>
      <h2>Member Nodes</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
