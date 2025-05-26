import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: [{ type: 'text', content: '' }]
  });

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      navigate('/');
      return;
    }
    
   
    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'instructor' && userData.role !== 'admin') {
        setError('You do not have permission to access this page');
        setTimeout(() => navigate('/dashboard'), 2000);
        return;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/');
      return;
    }
    
    fetchCourses();
  }, [navigate]);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('please add course ');
      }

      const data = await response.json();
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.message || 'Error fetching courses');
      console.error('Error fetching courses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentTypeChange = (index, type) => {
    const updatedContent = [...formData.content];
    updatedContent[index] = { type, content: '', url: '', duration: '' };
    setFormData(prev => ({
      ...prev,
      content: updatedContent
    }));
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      content: updatedContent
    }));
  };

  const addContentItem = () => {
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, { type: 'text', content: '' }]
    }));
  };

  const removeContentItem = (index) => {
    const updatedContent = [...formData.content];
    updatedContent.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      content: updatedContent
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const url = editingCourse 
        ? `http://localhost:5000/api/courses/${editingCourse._id}`
        : 'http://localhost:5000/api/courses';
      
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error saving course');
      }

      const data = await response.json();
      
      
      if (editingCourse) {
        
        setCourses(prev => prev.map(course => 
          course._id === editingCourse._id ? { ...course, ...formData, _id: course._id } : course
        ));
      } else if (data.course) {
        
        setCourses(prev => [...prev, data.course]);
      } else {
       
        await fetchCourses();
      }

   
      resetForm();
      setShowForm(false);

      
      alert(editingCourse ? 'Course updated successfully' : 'Course created successfully');
    } catch (err) {
      setError(err.message || 'Error saving course');
      console.error('Error saving course:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete course');
      }

     
      setCourses(prev => prev.filter(course => course._id !== courseId));
      alert('Course deleted successfully');
    } catch (err) {
      setError(err.message || 'Error deleting course');
      console.error('Error deleting course:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (course) => {
   
    setFormData({
      title: course.title || '',
      description: course.description || '',
      content: course.content && course.content.length > 0 
        ? JSON.parse(JSON.stringify(course.content))
        : [{ type: 'text', content: '' }]
    });
    setEditingCourse(course);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: [{ type: 'text', content: '' }]
    });
    setEditingCourse(null);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const toggleCourseDetails = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="mb-3">Course Management</h1>
          <p className="text-muted">Create and manage your courses</p>
        </div>
        <div className="col-auto">
          {!showForm && (
            <button 
              className="btn btn-primary" 
              onClick={() => setShowForm(true)}
            >
              <Plus size={18} className="me-1" /> Create New Course
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-white">
            <h4 className="mb-0">{editingCourse ? 'Edit Course' : 'Create New Course'}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Course Content</label>
                
                {formData.content.map((item, index) => (
                  <div key={index} className="card mb-3 border-light">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">Content Type</label>
                          <select
                            className="form-select"
                            value={item.type}
                            onChange={(e) => handleContentTypeChange(index, e.target.value)}
                            required
                          >
                            <option value="text">Text</option>
                            <option value="video">Video</option>
                            <option value="interactive">Interactive</option>
                          </select>
                        </div>
                        <div className="col-auto d-flex align-items-end">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeContentItem(index)}
                            disabled={formData.content.length <= 1}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {item.type === 'video' && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">Video URL</label>
                            <input
                              type="url"
                              className="form-control"
                              value={item.url || ''}
                              onChange={(e) => handleContentChange(index, 'url', e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Duration (e.g. "10:30")</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.duration || ''}
                              onChange={(e) => handleContentChange(index, 'duration', e.target.value)}
                              required
                            />
                          </div>
                        </>
                      )}

                      {(item.type === 'text' || item.type === 'interactive') && (
                        <div className="mb-3">
                          <label className="form-label">Content</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            value={item.content || ''}
                            onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                            required
                          ></textarea>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={addContentItem}
                >
                  <Plus size={18} className="me-1" /> Add Content Section
                </button>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course')}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && !showForm ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {courses.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                You haven't created any courses yet. Get started by creating your first course!
              </div>
            </div>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="col-12 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{course.title}</h5>
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEdit(course)}
                        >
                          <Edit size={16} className="me-1" /> Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(course._id)}
                        >
                          <Trash2 size={16} className="me-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>{course.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-secondary me-2">{course.content?.length || 0} Sections</span>
                        <small className="text-muted">Created: {new Date(course.createdAt).toLocaleDateString()}</small>
                      </div>
                      <button
                        className="btn btn-link"
                        onClick={() => toggleCourseDetails(course._id)}
                      >
                        {expandedCourse === course._id ? (
                          <>Hide Details <ChevronUp size={16} /></>
                        ) : (
                          <>Show Details <ChevronDown size={16} /></>
                        )}
                      </button>
                    </div>

                    {expandedCourse === course._id && course.content && (
                      <div className="mt-3">
                        <h6>Course Content:</h6>
                        <div className="list-group mt-2">
                          {course.content.map((item, index) => (
                            <div key={index} className="list-group-item">
                              <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1">Section {index + 1} - {item.type.charAt(0).toUpperCase() + item.type.slice(1)}</h6>
                                {item.type === 'video' && (
                                  <small>{item.duration}</small>
                                )}
                              </div>
                              
                              {item.type === 'video' && (
                                <p className="mb-1">
                                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.url}
                                  </a>
                                </p>
                              )}
                              
                              {(item.type === 'text' || item.type === 'interactive') && (
                                <p className="mb-1">
                                  {item.content.length > 100 
                                    ? `${item.content.substring(0, 100)}...` 
                                    : item.content}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Course;