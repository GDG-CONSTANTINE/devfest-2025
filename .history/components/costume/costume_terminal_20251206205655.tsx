import { HackathonEntry } from '@/Types/hackathon_entry';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import FormField from './field_form';
import { createNewHackathonMember } from '@/app/services/hackathon_handler';

const TYPING_DELAY = 20
const terminalLines = [
  { text: ">>  Loading Data Clusters.... (1/3)", color: "text-green-400", delay: TYPING_DELAY },
  { text: ">>  Loading Data Clusters.... (2/3)", color: "text-green-400", delay: TYPING_DELAY },
  { text: ">>  ERROR: Invalid Key - retrying...", color: "text-red-500", delay: TYPING_DELAY },
  { text: ">>  ERROR: Access Denied", color: "text-red-500", delay: TYPING_DELAY },
  { text: ">>  ERROR: Invalid Key - retrying...", color: "text-red-500", delay: TYPING_DELAY },
  { text: ">>  ERROR: Access Denied", color: "text-red-500", delay: TYPING_DELAY },
  { text: ">>  ERROR: Rebooting....", color: "text-red-500", delay: TYPING_DELAY },
  { text: ">>  ALERT: A■■■■ G■■n■d", color: "text-yellow-500", delay: TYPING_DELAY },
  { text: ">>  Loading Data Clusters.... (3/3)", color: "text-yellow-400", delay: TYPING_DELAY },
  { text: ">>  MESSAGE: 'You've been invited to join the GDG Constantine 2025 Hackathon! Bring your team and prepare for an intense coding experience where collaboration meets competition. This is your chance to push technical boundaries, build something extraordinary, and compete alongside the brightest minds in our community. Work together to tackle challenging problems, learn from each other, and showcase what your team can accomplish. Whether you're seasoned developers or rising talents, this is your playground to innovate, experiment, and fight for the top spot.'", color: "text-white", delay: TYPING_DELAY },
  { text: ">>  ", color: "text-white", delay: TYPING_DELAY },
  { text: ">>  OBJECTIVE: 'Complete a project within the time limit working alongside team members and pitch the work in front of judging members formed of top voices in the tech sector'", color: "text-white", delay: TYPING_DELAY },
  { text: ">>  Loading Devfest Constantine 2025 Data Model.... (1/2) ", color: "text-green-400", delay: TYPING_DELAY },
  { text: ">>  Loading Devfest Constantine 2025 Data Model.... (2/2) ", color: "text-green-400", delay: TYPING_DELAY },
  { text: ">>  Hackathon_2025 = {", color: "text-cyan-400", delay: TYPING_DELAY },
  { text: "     id: 'Hackathon_constantine_2025',", color: "text-white", delay: TYPING_DELAY },
  { text: "     name: 'Hackathon 2025',", color: "text-white", delay: TYPING_DELAY },
  { text: "     start_date: '2025-12-11',", color: "text-white", delay: TYPING_DELAY },
  { text: "     end_date: '2025-12-14',", color: "text-white", delay: TYPING_DELAY },
  { text: "     location: 'Mega Fete Hall, La Zone Ali Mendjeli", color: "text-white", delay: TYPING_DELAY },
  { text: "  }", color: "text-cyan-400", delay: TYPING_DELAY },
  { text: ">>  ", color: "text-white", delay: TYPING_DELAY },
  { text: ">>  NOTICE: Don't miss it", color: "text-white", delay: TYPING_DELAY },
  { text: ">>  ", color: "text-white", delay: TYPING_DELAY },
  { text: ">>  ALERT: Creating new Hackathon Entry....", color: "text-green-400", delay: TYPING_DELAY },
];

const AnimatedTerminal = forwardRef((props, ref) => {
  const [lines, setLines] = useState<{ text: string, color: string, delay: number }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [standardDelay, setStandardDelay] = useState(20)
  const [currentChar, setCurrentChar] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [workingOnEntry, setWorkingOnEntry] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)


  // 
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    university_or_company: '',
    t_shirt_size: 'M',
    role: 'member',
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    team_name: '',
    leader_key: '',
    why_participate: ''
  });

  useEffect(() => {
    if (currentLine >= terminalLines.length) {
      setShowForm(true);
      return;
    }

    const currentLineData = terminalLines[currentLine];
    const fullText = currentLineData.text;

    if (currentChar < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentChar(currentChar + 1);
      }, standardDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, currentLineData]);
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentChar, currentLine, standardDelay]);


  // 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setShowError(false);
  };


  // 
  const validateForm = () => {
    const requiredFields = [
      'full_name',
      'email',
      'phone_number',
      'university_or_company',
      't_shirt_size',
      'role',
      'linkedin_url',
      'github_url',
      'why_participate'
    ];

    if (formData.role === 'leader') {
      requiredFields.push('team_name');
    } else if (formData.role === 'member') {
      requiredFields.push('leader_key');
    }

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return false;
      }
    }

    return true;
  };


  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setWorkingOnEntry(true)

      // handle error
      if (!validateForm()) {
        setShowError(true);
        return;
      }

      setShowError(false);
      console.log('Form submitted:', formData);
      // Handle form submission here
      const res = await createNewHackathonMember((formData as HackathonEntry))
      if (res && res.success) {
        console.log(res.message)
        setShowForm(false)
        handleClear()
        setMessage(res.data as string)
      } else {
        setErrorMessage(res?.data as string)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  const handleClear = () => {
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      university_or_company: '',
      t_shirt_size: 'M',
      role: 'member',
      linkedin_url: '',
      github_url: '',
      portfolio_url: '',
      team_name: '',
      leader_key: '',
      why_participate: ''
    });
    setShowError(false);
  };


  useImperativeHandle(ref, () => ({
    triggerAction: handleSkipClicked
  }), [])

  const handleSkipClicked = () => {
    setStandardDelay(0)
  }

  return (
    <div>
      <div className="p-6 font-mono">
        <div className="w-full flex flex-col pl-2 leading-7 text-sm">
          {lines.map((line, index) => (
            <span key={index} className={line.color} style={{ whiteSpace: 'pre-wrap' }}>
              {line.text}
            </span>
          ))}
          {currentLine < terminalLines.length && (
            <span className={terminalLines[currentLine].color} style={{ whiteSpace: 'pre-wrap' }}>
              {terminalLines[currentLine].text.substring(0, currentChar)}
              <span className="animate-pulse">█</span>
            </span>
          )}
        </div>

        {showForm && (
          <div className="mt-6 pt-6">
            <div className="text-cyan-400 mb-4">
              <span>{'>>  New_Entry = {'}</span>
            </div>

            <div className="space-y-2 pl-6">
              <FormField
                label="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="text"
                placeholder="'John Doe'"
              />

              <FormField
                label="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="email"
                placeholder="'john@example.com'"
              />

              <FormField
                label="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="tel"
                placeholder="'+213 555 123 456'"
              />

              <FormField
                label="university_or_company"
                name="university_or_company"
                value={formData.university_or_company}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="text"
                placeholder="'University of Constantine'"
              />

              <FormField
                label="t_shirt_size"
                name="t_shirt_size"
                value={formData.t_shirt_size}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="select"
                options={[
                  { value: 'S', label: 'S' },
                  { value: 'M', label: 'M' },
                  { value: 'L', label: 'L' },
                  { value: 'XL', label: 'XL' },
                  { value: 'XL', label: 'XXL' },
                ]}
              />

              <FormField
                label="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="select"
                options={[
                  { value: 'leader', label: 'Leader' },
                  { value: 'member', label: 'Member' },
                ]}
              />

              {formData.role === 'leader' && (
                <FormField
                  label="team_name"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleInputChange}
                  readOnly={isLoading}
                  type="text"
                  placeholder="'Code Ninjas'"
                />
              )}

              {formData.role === 'member' && (
                <FormField
                  label="leader_key"
                  name="leader_key"
                  value={formData.leader_key}
                  onChange={handleInputChange}
                  readOnly={isLoading}
                  type="text"
                  placeholder="'TEAM-XXXX-XXXX'"
                />
              )}

              <FormField
                label="linkedin_url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="url"
                placeholder="'https://linkedin.com/in/johndoe'"
              />

              <FormField
                label="github_url"
                name="github_url"
                value={formData.github_url}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="url"
                placeholder="'https://github.com/johndoe'"
              />

              <FormField
                label="portfolio_url"
                name="portfolio_url"
                value={formData.portfolio_url}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="url"
                placeholder="'https://johndoe.dev'"
              />

              <FormField
                label="why_participate"
                name="why_participate"
                value={formData.why_participate}
                onChange={handleInputChange}
                readOnly={isLoading}
                type="textarea"
                placeholder="'I want to learn and collaborate...'"
                multiline
              />

              <div className="text-cyan-400 mt-4">
                <span>{'  }'}</span>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  disabled={isLoading}
                  onClick={async () => await handleSubmit()}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 border border-green-400 transition-colors"
                >
                  {'>> SUBMIT_ENTRY()'}
                </button>
                <button
                  onClick={handleClear}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 border border-red-400 transition-colors"
                >
                  {'>> CLEAR()'}
                </button>
              </div>

              {showError && (
                <div className="pl-6 mt-2">
                  <span className="text-red-500">{'>> ERROR: All fields are required except portfolio_url'}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {workingOnEntry && (
          <div className="pl-6 mt-2">
            <span className="text-green-500">{`>> Loading entry information into db.... (1/1)`}</span>
          </div>
        )}
        {message && (
          <div className="pl-6 mt-2 flex flex-col">
            <span className="text-green-500">{`>> ALERT: ${message}`}</span>
            <span className="text-green-500">{`>> ALERT: A message with your leader key have been sent to your email address`}</span>
          </div>
        )}
        {errorMessage && (
          <div className="pl-6 mt-2">
            <span className="text-red-500">{`>> ERROR: ${errorMessage}`}</span>
          </div>
        )}
      </div>
    </div>
  );
})

AnimatedTerminal.displayName = 'AnimatedTerminal';

export default AnimatedTerminal