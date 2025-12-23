import React, { useState } from 'react';
import CustomModal from '../components/CustomModal/CustomModal';
import Toast from '../components/Toast/Toast';
import styles from '../css/Investment.module.css';
import { Plus, X, Edit2, Trash2, Pause, Play } from 'lucide-react';

const ScheduleReportsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [newSchedule, setNewSchedule] = useState({
    reportType: '',
    frequency: '',
    format: '',
    time: '',
    dayOfWeek: '',
    dayOfMonth: '',
    emailRecipients: []
  });
  const [emailInput, setEmailInput] = useState('');
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      reportType: 'Performance Overview',
      frequency: 'Weekly',
      format: 'PDF',
      time: '09:00 AM',
      dayOfWeek: 'Monday',
      emailRecipients: ['admin@podermonie.com', 'finance@podermonie.com'],
      status: 'Active',
      createdDate: '2024-01-10'
    },
    {
      id: 2,
      reportType: 'Investment Analysis',
      frequency: 'Monthly',
      format: 'CSV',
      time: '08:00 AM',
      dayOfMonth: '1',
      emailRecipients: ['reports@podermonie.com'],
      status: 'Active',
      createdDate: '2024-01-05'
    },
    {
      id: 3,
      reportType: 'Payout Report',
      frequency: 'Daily',
      format: 'PDF',
      time: '06:00 AM',
      emailRecipients: ['finance@podermonie.com'],
      status: 'Paused',
      createdDate: '2024-01-01'
    }
  ]);
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const reportTypes = [
    'Performance Overview',
    'Investment Analysis',
    'Payout Report',
    'Risk Assessment'
  ];

  const frequencies = ['Daily', 'Weekly', 'Monthly'];
  const formats = ['PDF', 'CSV', 'Excel'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysOfMonth = Array.from({ length: 28 }, (_, i) => (i + 1).toString());

  const handleInputChange = (field, value) => {
    setNewSchedule(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleAddEmail = () => {
    if (!emailInput.trim()) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address'
      });
      return;
    }

    if (newSchedule.emailRecipients.includes(emailInput)) {
      setToast({
        type: 'error',
        title: 'Duplicate Email',
        message: 'This email is already added'
      });
      return;
    }

    setNewSchedule(prev => ({
      ...prev,
      emailRecipients: [...prev.emailRecipients, emailInput]
    }));
    setEmailInput('');
  };

  const handleRemoveEmail = (email) => {
    setNewSchedule(prev => ({
      ...prev,
      emailRecipients: prev.emailRecipients.filter(e => e !== email)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newSchedule.reportType) newErrors.reportType = 'Report type is required';
    if (!newSchedule.frequency) newErrors.frequency = 'Frequency is required';
    if (!newSchedule.format) newErrors.format = 'Format is required';
    if (!newSchedule.time) newErrors.time = 'Time is required';
    if (newSchedule.frequency === 'Weekly' && !newSchedule.dayOfWeek) {
      newErrors.dayOfWeek = 'Day of week is required';
    }
    if (newSchedule.frequency === 'Monthly' && !newSchedule.dayOfMonth) {
      newErrors.dayOfMonth = 'Day of month is required';
    }
    if (newSchedule.emailRecipients.length === 0) {
      newErrors.emailRecipients = 'At least one email recipient is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateSchedule = () => {
    if (!validateForm()) {
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    const schedule = {
      id: Date.now(),
      ...newSchedule,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setSchedules(prev => [...prev, schedule]);
    setNewSchedule({
      reportType: '',
      frequency: '',
      format: '',
      time: '',
      dayOfWeek: '',
      dayOfMonth: '',
      emailRecipients: []
    });
    setEmailInput('');
    setErrors({});
    setToast({
      type: 'success',
      title: 'Schedule Created',
      message: 'Report schedule has been created successfully'
    });
  };

  const handleEditSchedule = (schedule) => {
    setEditingScheduleId(schedule.id);
    setNewSchedule({
      reportType: schedule.reportType,
      frequency: schedule.frequency,
      format: schedule.format,
      time: schedule.time,
      dayOfWeek: schedule.dayOfWeek || '',
      dayOfMonth: schedule.dayOfMonth || '',
      emailRecipients: [...schedule.emailRecipients]
    });
    setActiveTab('create');
  };

  const handleUpdateSchedule = () => {
    if (!validateForm()) {
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setSchedules(prev => prev.map(s =>
      s.id === editingScheduleId
        ? { ...s, ...newSchedule }
        : s
    ));

    setNewSchedule({
      reportType: '',
      frequency: '',
      format: '',
      time: '',
      dayOfWeek: '',
      dayOfMonth: '',
      emailRecipients: []
    });
    setEmailInput('');
    setEditingScheduleId(null);
    setErrors({});
    setToast({
      type: 'success',
      title: 'Schedule Updated',
      message: 'Report schedule has been updated successfully'
    });
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    setToast({
      type: 'success',
      title: 'Schedule Deleted',
      message: 'Report schedule has been deleted successfully'
    });
  };

  const handleToggleStatus = (id) => {
    setSchedules(prev => prev.map(s =>
      s.id === id
        ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' }
        : s
    ));
    const schedule = schedules.find(s => s.id === id);
    setToast({
      type: 'success',
      title: 'Status Updated',
      message: `Schedule has been ${schedule.status === 'Active' ? 'paused' : 'activated'}`
    });
  };

  const handleClose = () => {
    setActiveTab('create');
    setNewSchedule({
      reportType: '',
      frequency: '',
      format: '',
      time: '',
      dayOfWeek: '',
      dayOfMonth: '',
      emailRecipients: []
    });
    setEmailInput('');
    setEditingScheduleId(null);
    setErrors({});
    onClose();
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Schedule Reports"
        width="800px"
      >
        <div className={styles.scheduleModalContent}>
          {/* Tabs */}
          <div className={styles.scheduleTabs}>
            <button
              className={`${styles.scheduleTab} ${activeTab === 'create' ? styles.activeTab : ''}`}
              onClick={() => {
                setActiveTab('create');
                setEditingScheduleId(null);
                setNewSchedule({
                  reportType: '',
                  frequency: '',
                  format: '',
                  time: '',
                  dayOfWeek: '',
                  dayOfMonth: '',
                  emailRecipients: []
                });
                setEmailInput('');
                setErrors({});
              }}
            >
              <Plus size={16} />
              {editingScheduleId ? 'Edit Schedule' : 'Create Schedule'}
            </button>
            <button
              className={`${styles.scheduleTab} ${activeTab === 'manage' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('manage')}
            >
              Manage Schedules
            </button>
          </div>

          {/* Create Schedule Tab */}
          {activeTab === 'create' && (
            <div className={styles.scheduleForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Report Type <span style={{ color: '#dc2626' }}>*</span></label>
                  <select
                    className={styles.formSelect}
                    value={newSchedule.reportType}
                    onChange={(e) => handleInputChange('reportType', e.target.value)}
                  >
                    <option value="">Select Report Type</option>
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.reportType && (
                    <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.reportType}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Frequency <span style={{ color: '#dc2626' }}>*</span></label>
                  <select
                    className={styles.formSelect}
                    value={newSchedule.frequency}
                    onChange={(e) => {
                      handleInputChange('frequency', e.target.value);
                      handleInputChange('dayOfWeek', '');
                      handleInputChange('dayOfMonth', '');
                    }}
                  >
                    <option value="">Select Frequency</option>
                    {frequencies.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                  {errors.frequency && (
                    <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.frequency}</span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Format <span style={{ color: '#dc2626' }}>*</span></label>
                  <select
                    className={styles.formSelect}
                    value={newSchedule.format}
                    onChange={(e) => handleInputChange('format', e.target.value)}
                  >
                    <option value="">Select Format</option>
                    {formats.map(format => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                  {errors.format && (
                    <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.format}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Time <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="time"
                    className={styles.formInput}
                    value={newSchedule.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                  {errors.time && (
                    <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.time}</span>
                  )}
                </div>
              </div>

              {newSchedule.frequency === 'Weekly' && (
                <div className={styles.formGroup}>
                  <label>Day of Week <span style={{ color: '#dc2626' }}>*</span></label>
                  <select
                    className={styles.formSelect}
                    value={newSchedule.dayOfWeek}
                    onChange={(e) => handleInputChange('dayOfWeek', e.target.value)}
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  {errors.dayOfWeek && (
                    <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.dayOfWeek}</span>
                  )}
                </div>
              )}

              {newSchedule.frequency === 'Monthly' && (
                <div className={styles.formGroup}>
                  <label>Day of Month <span style={{ color: '#dc2626' }}>*</span></label>
                  <select
                    className={styles.formSelect}
                    value={newSchedule.dayOfMonth}
                    onChange={(e) => handleInputChange('dayOfMonth', e.target.value)}
                  >
                    <option value="">Select Day</option>
                    {daysOfMonth.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  {errors.dayOfMonth && (
                    <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.dayOfMonth}</span>
                  )}
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Email Recipients <span style={{ color: '#dc2626' }}>*</span></label>
                <div className={styles.recipientInputWrapper}>
                  <input
                    type="email"
                    className={styles.formInput}
                    placeholder="Enter email address"
                    value={emailInput}
                    onChange={handleEmailChange}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddEmail();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={styles.addRecipientBtn}
                    onClick={handleAddEmail}
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
                {newSchedule.emailRecipients.length > 0 && (
                  <div className={styles.recipientsList}>
                    {newSchedule.emailRecipients.map((email, index) => (
                      <span key={index} className={styles.recipientTag}>
                        {email}
                        <button
                          type="button"
                          className={styles.removeRecipientBtn}
                          onClick={() => handleRemoveEmail(email)}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.emailRecipients && (
                  <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.emailRecipients}</span>
                )}
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.cancelBtn}
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className={styles.submitBtn}
                  onClick={editingScheduleId ? handleUpdateSchedule : handleCreateSchedule}
                >
                  {editingScheduleId ? 'Update Schedule' : 'Create Schedule'}
                </button>
              </div>
            </div>
          )}

          {/* Manage Schedules Tab */}
          {activeTab === 'manage' && (
            <div>
              {schedules.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No scheduled reports found</p>
                  <p style={{ fontSize: '12px', marginTop: '8px' }}>
                    Create a new schedule to get started
                  </p>
                </div>
              ) : (
                <div className={styles.schedulesList}>
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className={styles.scheduleCard}>
                      <div className={styles.scheduleHeader}>
                        <div>
                          <h4 className={styles.scheduleTitle}>{schedule.reportType}</h4>
                          <span className={`${styles.scheduleStatus} ${
                            schedule.status === 'Active' ? styles.statusActive : styles.statusPaused
                          }`}>
                            {schedule.status}
                          </span>
                        </div>
                        <div className={styles.scheduleActions}>
                          <button
                            className={styles.actionButton}
                            onClick={() => handleToggleStatus(schedule.id)}
                            title={schedule.status === 'Active' ? 'Pause' : 'Activate'}
                          >
                            {schedule.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                          <button
                            className={styles.actionButton}
                            onClick={() => handleEditSchedule(schedule)}
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className={styles.actionButton}
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className={styles.scheduleDetails}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Frequency:</span>
                          <span className={styles.detailValue}>{schedule.frequency}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Format:</span>
                          <span className={styles.detailValue}>{schedule.format}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Time:</span>
                          <span className={styles.detailValue}>{schedule.time}</span>
                        </div>
                        {schedule.dayOfWeek && (
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Day:</span>
                            <span className={styles.detailValue}>{schedule.dayOfWeek}</span>
                          </div>
                        )}
                        {schedule.dayOfMonth && (
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Day of Month:</span>
                            <span className={styles.detailValue}>{schedule.dayOfMonth}</span>
                          </div>
                        )}
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Recipients:</span>
                          <span className={styles.detailValue}>
                            {schedule.emailRecipients.join(', ')}
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Created:</span>
                          <span className={styles.detailValue}>{schedule.createdDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CustomModal>

      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default ScheduleReportsModal;

