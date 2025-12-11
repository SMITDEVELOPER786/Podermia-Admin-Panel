import React, { useState, useRef, useEffect } from 'react';
import styles from '../../css/SupportSystem.module.css';
import { RefreshCcw, Upload, Phone, ChevronDown, Paperclip, Wallet, User, Circle, MessageSquare, MessageCircle, X } from 'lucide-react';
import Toast from '../../components/Toast/Toast';

const ReplyThreads = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: '', title: '' });
  const [selectedTicket, setSelectedTicket] = useState('TKT-002');
  const [replyType, setReplyType] = useState('Customer Reply (Public)');
  const [templateCategory, setTemplateCategory] = useState('Select Category');
  const [quickTemplate, setQuickTemplate] = useState('Add a Quick Template');
  const [replyMessage, setReplyMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);
  
  // Dropdown states
  const [showTicketDropdown, setShowTicketDropdown] = useState(false);
  const [showReplyTypeDropdown, setShowReplyTypeDropdown] = useState(false);
  const [showTemplateCategoryDropdown, setShowTemplateCategoryDropdown] = useState(false);
  const [showQuickTemplateDropdown, setShowQuickTemplateDropdown] = useState(false);
  
  // Refs for dropdowns
  const ticketDropdownRef = useRef(null);
  const replyTypeDropdownRef = useRef(null);
  const templateCategoryDropdownRef = useRef(null);
  const quickTemplateDropdownRef = useRef(null);
  
  const [notifications, setNotifications] = useState({
    pushNotification: false,
    emailNotification: false,
    smsNotification: false,
    notifyOnCustomerReply: false,
    notifyOnAgentReply: false,
    notifyOnEscalation: false,
    notifyOnResolution: false,
    realTimeUpdates: false,
    autoReadReceipts: false,
    autoReadReceipts2: false
  });

  const [mbValue, setMbValue] = useState('10');

  const tickets = [
    { id: 'TKT-001', label: 'TKT-001 Unable to complete KYC Verification (High)' },
    { id: 'TKT-002', label: 'TKT-002 Transaction failed but amount debited (Critical)' },
    { id: 'TKT-003', label: 'TKT-003 Transaction failed but amount debited (Critical)' }
  ];

  const replyTypes = [
    'Customer Reply (Public)',
    'Internal Note (Private)'
  ];

  const templateCategories = [
    'Select Category',
    'KYC',
    'Wallet',
    'Technical',
    'Investment',
    'Loan'
  ];

  const quickTemplates = [
    'Add a Quick Template',
    'Template 1',
    'Template 2',
    'Template 3'
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ticketDropdownRef.current && !ticketDropdownRef.current.contains(event.target)) {
        setShowTicketDropdown(false);
      }
      if (replyTypeDropdownRef.current && !replyTypeDropdownRef.current.contains(event.target)) {
        setShowReplyTypeDropdown(false);
      }
      if (templateCategoryDropdownRef.current && !templateCategoryDropdownRef.current.contains(event.target)) {
        setShowTemplateCategoryDropdown(false);
      }
      if (quickTemplateDropdownRef.current && !quickTemplateDropdownRef.current.contains(event.target)) {
        setShowQuickTemplateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [conversation] = useState([
    {
      id: 1,
      sender: 'Sarah Johnson',
      role: 'Customer',
      isNew: true,
      message: 'Hi, I made a transaction of 50,000 yesterday to transfer money to my investment portfolio, but the transaction failed. However, the amount was debited from my wallet. My transaction reference is TXN-7987655. This is urgent I need to complete my investment before the deadline. Please help me resolve this immediately.',
      isOnline: true
    },
    {
      id: 2,
      sender: 'Mike Wilson (Agent)',
      role: 'Agent',
      isNew: true,
      message: 'Hi, I made a transaction of 50,000 yesterday to transfer money to my investment portfolio, but the transaction failed. However, the amount was debited from my wallet. My transaction reference is TXN-7987655. This is urgent I need to complete my investment before the deadline. Please help me resolve this immediately.',
      isOnline: false
    },
    {
      id: 3,
      sender: 'Mike Wilson (Support Agent)',
      role: 'Agent',
      isNew: true,
      message: 'Hi, I made a transaction of 50,000 yesterday to transfer money to my investment portfolio, but the transaction failed. However, the amount was debited from my wallet. My transaction reference is TXN-7987655. This is urgent I need to complete my investment before the deadline. Please help me resolve this immediately.',
      isOnline: false
    },
    {
      id: 4,
      sender: 'System Notification',
      role: 'Agent',
      isNew: false,
      message: 'Hi, I made a transaction of 50,000 yesterday to transfer money to my investment portfolio, but the transaction failed. However, the amount was debited from my wallet. My transaction reference is TXN-7987655. This is urgent I need to complete my investment before the deadline. Please help me resolve this immediately.',
      isOnline: false
    }
  ]);

  const handleRefreshThread = () => {
    setToast({ show: true, message: 'Thread refreshed successfully', type: 'success', title: 'Refreshed' });
  };

  const handleExportChat = () => {
    setToast({ show: true, message: 'Chat exported successfully', type: 'success', title: 'Export Complete' });
  };

  const handleEscalateCall = () => {
    setToast({ show: true, message: 'Call escalated successfully', type: 'success', title: 'Escalated' });
  };

  const handleMessageChange = (e) => {
    const text = e.target.value;
    setReplyMessage(text);
    setCharCount(text.length);
  };

  const handleSaveDraft = () => {
    setToast({ show: true, message: 'Draft saved successfully', type: 'success', title: 'Draft Saved' });
  };

  const handlePreview = () => {
    setToast({ show: true, message: 'Preview opened', type: 'info', title: 'Preview' });
  };

  const handleSendToCustomer = () => {
    if (!replyMessage.trim()) {
      setToast({ show: true, message: 'Please enter a message', type: 'error', title: 'Validation Error' });
      return;
    }
    setToast({ show: true, message: 'Message sent to customer successfully', type: 'success', title: 'Message Sent' });
    setReplyMessage('');
    setCharCount(0);
  };

  const handleToggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetSettings = () => {
    setNotifications({
      pushNotification: false,
      emailNotification: false,
      smsNotification: false,
      notifyOnCustomerReply: false,
      notifyOnAgentReply: false,
      notifyOnEscalation: false,
      notifyOnResolution: false,
      realTimeUpdates: false,
      autoReadReceipts: false,
      autoReadReceipts2: false
    });
    setMbValue('10');
    setToast({ show: true, message: 'Settings reset to default', type: 'success', title: 'Reset Complete' });
  };

  const handleSaveSettings = () => {
    setToast({ show: true, message: 'Communication settings saved successfully', type: 'success', title: 'Settings Saved' });
  };

  const handleAddAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAttachedFiles(prev => [...prev, ...files]);
      setToast({ show: true, message: `${files.length} file(s) attached successfully`, type: 'success', title: 'Files Attached' });
    }
    // Reset input to allow selecting same file again
    e.target.value = '';
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    setToast({ show: true, message: 'File removed', type: 'info', title: 'Removed' });
  };

  return (
    <div className={styles.replyThreadsContainer}>
      {toast.show && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '', title: '' })}
        />
      )}

      {/* Header Section */}
      <div className={styles.threadHeader}>
        <h2><MessageCircle size={18} className={styles.headerIcon} /> In- App Communication & Reply Thread Management</h2>
        
        <div className={styles.ticketSelector}>
          <h3>Select Active Ticket</h3>
          <div className={styles.ticketSelectRow}>
            <div className={styles.customDropdownWrapper} ref={ticketDropdownRef}>
              <div 
                className={styles.customDropdownSelected}
                onClick={() => setShowTicketDropdown(!showTicketDropdown)}
              >
                <span>{tickets.find(t => t.id === selectedTicket)?.label}</span>
                <ChevronDown size={18} className={showTicketDropdown ? styles.chevronRotate : ''} />
              </div>
              {showTicketDropdown && (
                <div className={styles.customDropdownMenu}>
                  {tickets.map(ticket => (
                    <div
                      key={ticket.id}
                      className={styles.customDropdownItem}
                      onClick={() => {
                        setSelectedTicket(ticket.id);
                        setShowTicketDropdown(false);
                      }}
                    >
                      {ticket.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
           <div className={styles.threadActions}>
             
            <button className={styles.refreshThreadBtn} onClick={handleRefreshThread}>
              <RefreshCcw size={16} />
              Refresh Thread
            </button>
            
            <button className={styles.exportChatBtn} onClick={handleExportChat}>
              <Upload size={16} />
              Export Chat
            </button>
            
            <button className={styles.escalateCallBtn} onClick={handleEscalateCall}>
              <Phone size={16} />
              Escalate to Voice Call
            </button>
           </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className={styles.ticketDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Ticket ID:</span>
            <span className={styles.detailValue}>TKT-002</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Customer:</span>
            <span className={styles.detailValue}>Sarah Johnson</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Category:</span>
            <span className={styles.categoryBadge}><Wallet size={16} /> Wallet</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Priority:</span>
            <span className={styles.priorityCriticalBadge}>Critical</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Status:</span>
            <span className={styles.statusPendingBadge}>Pending</span>
          </div>
        </div>
      </div>

      {/* Live Conversation Thread */}
      <div className={styles.conversationSection}>
        <div className={styles.conversationHeader}>
          <h3><MessageCircle size={16} className={styles.headerIcon} /> Live Conversation Thread</h3>
          <div className={styles.conversationStatus}>
            <span className={styles.onlineIndicator}><Circle size={12} fill="currentColor" /> Customer Online</span>
            <button className={styles.sendPushBtn}>Send Push Notification</button>
          </div>
        </div>

        <div className={styles.messagesList}>
          {conversation.map(msg => (
            <div key={msg.id} className={styles.messageItem}>
              <div className={styles.messageHeader}>
                <span className={styles.senderName}><User size={14} /> {msg.sender}</span>
                <span className={msg.role === 'Customer' ? styles.customerBadge : styles.agentBadge}>
                  {msg.role}
                </span>
                {msg.isNew && <span className={styles.newBadge}>New</span>}
              </div>
              <p className={styles.messageText}>{msg.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compose Reply */}
      <div className={styles.composeSection}>
        <h3>Compose Reply</h3>
        
        <div className={styles.composeControls}>
          <div className={styles.controlGroup}>
            <label>Reply Type</label>
            <div className={styles.customDropdownWrapper} ref={replyTypeDropdownRef}>
              <div 
                className={styles.customDropdownSelected}
                onClick={() => setShowReplyTypeDropdown(!showReplyTypeDropdown)}
              >
                <span>{replyType}</span>
                <ChevronDown size={18} className={showReplyTypeDropdown ? styles.chevronRotate : ''} />
              </div>
              {showReplyTypeDropdown && (
                <div className={styles.customDropdownMenu}>
                  {replyTypes.map((type, idx) => (
                    <div
                      key={idx}
                      className={styles.customDropdownItem}
                      onClick={() => {
                        setReplyType(type);
                        setShowReplyTypeDropdown(false);
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.controlGroup}>
            <label>Template Category</label>
            <div className={styles.customDropdownWrapper} ref={templateCategoryDropdownRef}>
              <div 
                className={styles.customDropdownSelected}
                onClick={() => setShowTemplateCategoryDropdown(!showTemplateCategoryDropdown)}
              >
                <span>{templateCategory}</span>
                <ChevronDown size={18} className={showTemplateCategoryDropdown ? styles.chevronRotate : ''} />
              </div>
              {showTemplateCategoryDropdown && (
                <div className={styles.customDropdownMenu}>
                  {templateCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className={styles.customDropdownItem}
                      onClick={() => {
                        setTemplateCategory(cat);
                        setShowTemplateCategoryDropdown(false);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.controlGroup}>
            <label>Quick Template</label>
            <div className={styles.customDropdownWrapper} ref={quickTemplateDropdownRef}>
              <div 
                className={styles.customDropdownSelected}
                onClick={() => setShowQuickTemplateDropdown(!showQuickTemplateDropdown)}
              >
                <span>{quickTemplate}</span>
                <ChevronDown size={18} className={showQuickTemplateDropdown ? styles.chevronRotate : ''} />
              </div>
              {showQuickTemplateDropdown && (
                <div className={styles.customDropdownMenu}>
                  {quickTemplates.map((temp, idx) => (
                    <div
                      key={idx}
                      className={styles.customDropdownItem}
                      onClick={() => {
                        setQuickTemplate(temp);
                        setShowQuickTemplateDropdown(false);
                      }}
                    >
                      {temp}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <button className={styles.attachmentBtn} onClick={handleAddAttachment}>
            <Paperclip size={16} />
            Add Attachment
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            multiple
          />
        </div>

        {/* Attached Files Display */}
        {attachedFiles.length > 0 && (
          <div className={styles.attachedFilesContainer}>
            <h4>Attached Files ({attachedFiles.length})</h4>
            <div className={styles.attachedFilesList}>
              {attachedFiles.map((file, index) => (
                <div key={index} className={styles.attachedFileItem}>
                  <Paperclip size={14} />
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>({(file.size / 1024).toFixed(2)} KB)</span>
                  <button 
                    className={styles.removeFileBtn}
                    onClick={() => handleRemoveFile(index)}
                    title="Remove file"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.messageInputGroup}>
          <label>Customer Reply Message</label>
          <textarea
            value={replyMessage}
            onChange={handleMessageChange}
            placeholder="Type your reply to the customer..."
            className={styles.messageTextarea}
            rows={6}
          />
          <div className={styles.textareaFooter}>
            <span className={styles.charCounter}>Character: {charCount} | Autosave: ON</span>
            <div className={styles.messageActions}>
              <button className={styles.saveDraftBtn} onClick={handleSaveDraft}>Save Draft</button>
              <button className={styles.previewBtn} onClick={handlePreview}>Preview</button>
              <button className={styles.sendCustomerBtn} onClick={handleSendToCustomer}>Send to Customer</button>
            </div>
          </div>
        </div>
      </div>

      {/* Push Notification Settings */}
      <div className={styles.notificationSettings}>
        <h3>Push Notification & Alert Settings</h3>
        
        <div className={styles.notificationGrid}>
          <div className={styles.notificationColumn}>
            <h4>Notification Channels</h4>
            
            <div className={styles.notificationItem}>
              <div>
                <h5>Push Notification Enabled</h5>
                <p>Send Push Notifications to mobile devices</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.pushNotification}
                  onChange={() => handleToggleNotification('pushNotification')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div>
                <h5>Email Notification Enabled</h5>
                <p>Send Email Notifications</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.emailNotification}
                  onChange={() => handleToggleNotification('emailNotification')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div>
                <h5>Sms Notification Enabled</h5>
                <p>Send SMS Notifications for urgent updates</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.smsNotification}
                  onChange={() => handleToggleNotification('smsNotification')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div>
                <h5>Notify On Customer Reply</h5>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.notifyOnCustomerReply}
                  onChange={() => handleToggleNotification('notifyOnCustomerReply')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>

          <div className={styles.notificationColumn}>
            <h4>Alert Triggers</h4>
            
            <div className={styles.notificationItem}>
              <div>
                <h5>Notify On Agent Reply</h5>
                <p>Alert when agent replies to ticket</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.notifyOnAgentReply}
                  onChange={() => handleToggleNotification('notifyOnAgentReply')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div>
                <h5>Notify On Escalation</h5>
                <p>Alert when ticket is escalated</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.notifyOnEscalation}
                  onChange={() => handleToggleNotification('notifyOnEscalation')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div>
                <h5>Notify On Resolution</h5>
                <p>Alert when ticket is resolved</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.notifyOnResolution}
                  onChange={() => handleToggleNotification('notifyOnResolution')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div>
                <h5>Real Time Updates</h5>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notifications.realTimeUpdates}
                  onChange={() => handleToggleNotification('realTimeUpdates')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className={styles.additionalSettings}>
          <div className={styles.notificationItem}>
            <div>
              <h5>Auto Read Receipts</h5>
              <p>Automatically mark messages as read when viewed</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={notifications.autoReadReceipts}
                onChange={() => handleToggleNotification('autoReadReceipts')}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div>
              <h5>Email Notification Enabled</h5>
              <p>Send Email Notifications</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={notifications.emailNotification}
                onChange={() => handleToggleNotification('emailNotification')}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div>
              <h5>Sms Notification Enabled</h5>
              <p>Send SMS Notifications for urgent updates</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={notifications.smsNotification}
                onChange={() => handleToggleNotification('smsNotification')}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div>
              <h5>Notify On Customer Reply</h5>
            </div>
            <div className={styles.mbInputGroup}>
              <input
                type="text"
                value={mbValue}
                onChange={(e) => setMbValue(e.target.value)}
                className={styles.mbInput}
              />
              <span className={styles.mbLabel}>MB</span>
            </div>
          </div>

          <div className={styles.notificationItem}>
            <div>
              <h5>Auto Read Receipts</h5>
              <p>Automatically mark messages as read when viewed</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={notifications.autoReadReceipts2}
                onChange={() => handleToggleNotification('autoReadReceipts2')}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>

        <div className={styles.settingsActions}>
          <button className={styles.resetSettingsBtn} onClick={handleResetSettings}>
            Reset Settings
          </button>
          <button className={styles.saveCommSettingsBtn} onClick={handleSaveSettings}>
            Save Communication Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyThreads;
