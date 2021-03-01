import { useSelector } from 'react-redux';
import { selectUser } from '../slices/user';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IFiles {
  title: string;
  dateAdded: string;
  path: string;
}

export default function Home() {
  const currentUser = useSelector(selectUser);
  const [files, setFiles] = useState<IFiles[]>([]);

  let upload = (file: any) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    axios.post('/api/file/new', formData).then((res: any) => {
      setFiles((arr: any) => [...arr, res.data]);
    });
  };

  let displayFiles = () => {
    if (files.length) {
      return files.map((file, i) => {
        return (
          <iframe
            key={i}
            src={'/' + file.path}
            width='300px'
            height='450px'
          ></iframe>
        );
      });
    }
  };

  useEffect(() => {
    axios.get('/api/file').then((res: any) => {
      setFiles(res.data);
      console.log(res.data);
    });
  }, []);

  function renderView() {
    if (currentUser.role === 'company') {
      return <h1>Company</h1>;
    } else {
      return (
        <nav>
          <ul>
            <li>
              <Link to='/companies/add'>Create Account</Link>
            </li>
            <li>
              <input type='file' onChange={(e) => upload(e.target.files)} />
            </li>
          </ul>
        </nav>
      );
    }
  }
  return (
    <div>
      <div>{renderView()}</div>
      <div className='grid grid-cols-6 gap-4'>{displayFiles()}</div>
    </div>
  );
}
