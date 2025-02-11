

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ImageModal from './ImageModal';
import History from './History';
import sampleImage from '../assets/Dog.jpeg';
import axios from 'axios';

const MainContent = ({
  showLoginForm, 
  onLoginClick, 
  onCloseLoginForm, 
  onLoginSuccess, 
  isLoggedIn, 
  history,
  username
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [randomText, setRandomText] = useState('');
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isContentCreator, setIsContentCreator] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [url, setUrl] = useState('');
  const [percentage, setPercentage] = useState('');
/*
  const handleSubmitClick = async () => {
    setSubmitted(true);
    setModalVisible(true);
    setRandomText("Processing your URL...");
    setShowCloseButton(false);

    try {
      // Call the Python script to process the URL
      const response = await axios.post('http://localhost:3001/api/url/process-url', { url }, { withCredentials: true });
      console.log('Response from server:', response.data);

      if (response.data) {
        // Assuming the response data is in the format "Title\nPercentage"
        const [title, percentage] = response.data.split('\n');
        setPercentage(percentage);
        console.log(percentage)

        if (isLoggedIn) {
          // Save the result to the database
          await axios.post('http://localhost:3001/add-url', { url: title, result: percentage }, { withCredentials: true });
          console.log('URL saved:', title);
        }
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error processing URL:', error.response ? error.response.data : error.message);
      alert('An error occurred while processing the URL. Please check the console for details.');
    } finally {
      setShowCloseButton(true);
    }
  };
*/const handleSubmitClick = async () => {
  

  setSubmitted(true);
  setModalVisible(true);
  setPercentage("Processing your URL...");
  setShowCloseButton(false);
  setTimeout(() => {
    setShowCloseButton(true);
  }, 3000);

  try {
    // Call the Python script to process the URL
    const response = await axios.post('http://localhost:3001/api/url/process-url', { url }, { withCredentials: true });
    console.log('Response from server:', response.data);

    if (response.data) {
      // Assuming the response data is in the format "Title\nPercentage"
      const val= response.data
      setPercentage(val);
      console.log(val)

      if (isLoggedIn) {
        // Save the result to the database
        await axios.post('http://localhost:3001/add-url', { url: val}, { withCredentials: true });
        //console.log('URL saved:', title);
      }
    } else {
      console.error('Unexpected response structure:', response.data);
    }
  } catch (error) {
    console.error('Error processing URL:', error.response ? error.response.data : error.message);
    alert('An error occurred while processing the URL. Please check the console for details.');
  } finally {
    setShowCloseButton(true);
  }
};

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleNewChatClick = () => {
    setSubmitted(false);
    setRandomText('');
    setModalVisible(false);
    setShowCloseButton(false);
    setIsContentCreator(false);
    setPdfFile(null);
    setUrl('');
    setPercentage('');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setShowCloseButton(false);
  };

  const handleContentCreatorClick = () => {
    setIsContentCreator(true);
  };

  const handleUrlClick = () => {
    setIsContentCreator(false);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handlePdfSubmit = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file to upload.');
      
      return;
    }

    setSubmitted(true);
    setPercentage("Processing your PDF...");
    setModalVisible(true);
    setShowCloseButton(false);
    setTimeout(() => {
      setShowCloseButton(true);
    }, 3000);

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      const response = await axios.post('http://localhost:3001/apiup/upload-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const val= response.data
      setPercentage(val);
      console.log('File uploaded and processed:', response.data.percentage);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    } finally {
      setShowCloseButton(true);
    }
  };

  return (
    <div className="main-content">
      <div className="left-side">
        {!submitted ? (
          <>
            {!isContentCreator ? (
              <>
               <div>
               <div className='Url-submit-section'>
                <input 
                  type='text' 
                  className='url-input' 
                  placeholder='Enter URL...' 
                  value={url}
                  onChange={handleUrlChange}
                  required
                />
                <button onClick={handleSubmitClick} className='enter-url-button'>Submit</button>
                </div>
                <p className='content-creator-text' onClick={handleContentCreatorClick}>Are you a Content-creator?</p>
               </div>
              </>
            ) : (
              <>
                <div>
                <div className='pdf-upload-section'>
                <input type='file' className='pdf-input' accept='application/pdf' onChange={handlePdfChange} required />
                <button onClick={handlePdfSubmit} className='pdf-upload-button'>Upload PDF</button>
                </div>
                <p className='content-creator-text' onClick={handleUrlClick}>Check through URL</p>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="result-box">
            <p className="percentage-text">{percentage}</p>
            <button className="new-chat-button" onClick={handleNewChatClick} type='submit'>New URL/PDF</button>
          </div>
        )}
      </div>
      <div className="right-side">
        {showLoginForm ? (
          <LoginForm
            onClose={onCloseLoginForm}
            onLoginSuccess={onLoginSuccess}
          />
        ) : (
          <>
            {!isLoggedIn ? (
              <div className='login-text-box'>
                <p className='login-text'>
                  <b>Unlock More with Your Login!</b><br/><br/>
                  Log in to access your personalized history and seamlessly pick up where you left off. 
                  View top channels and discover the latest trending videos tailored just for you. 
                  <b>Log in now!</b>
                </p>
                <button className="login-button" onClick={onLoginClick}>Login</button>
              </div>
            ) : (
              <>
                <h2>Welcome, {username}!</h2>
                
                <History items={history} />
              </>
            )}
          </>
        )}
      </div>
      {isModalVisible && (
        <ImageModal 
          isVisible={isModalVisible} 
          onClose={handleCloseModal} 
          imageUrl={sampleImage}
          showCloseButton={showCloseButton}
        />
      )}
    </div>
  );
};

export default MainContent;
