
export default function emailBody({ leaderName, leaderKey }
    : { leaderName: string, leaderKey: string }) {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Team Created Successfully</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                }
                .email-container {
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .header {
                    background-color: #5a6c7d;
                    padding: 30px 20px;
                    text-align: center;
                    color: #ffffff;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 30px;
                    color: #333333;
                    line-height: 1.6;
                }
                .key-box {
                    background-color: #f0f0f0;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                    border-radius: 5px;
                }
                .key-label {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 10px;
                }
                .key-value {
                    font-size: 28px;
                    font-weight: bold;
                    color: #5a6c7d;
                    font-family: monospace;
                    letter-spacing: 2px;
                }
                .note {
                    background-color: #f5f5f5;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-size: 14px;
                    color: #555;
                    border-left: 3px solid #5a6c7d;
                }
                .footer {
                    padding: 20px;
                    text-align: center;
                    color: #999;
                    font-size: 12px;
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <img src="cid:top" alt="Header" style="width: 100%; display: block;" />
                
                
                <div class="content">
                    <p>Hello <strong>${leaderName}</strong>,</p>
                    
                    <p>Your team has been successfully created.</p>
                    
                    <div class="key-box">
                        <div class="key-label">Your Team Leader Key:</div>
                        <div class="key-value">${leaderKey}</div>
                    </div>
                    
                    <p>Share this key with members who want to join your team. They can use it to join during registration.</p>
                    
                    <div class="note">
                        <strong>Note:</strong> Keep this key safe. Anyone with this key can join your team.
                    </div>
                    
                    <p>Thank you,<br><strong>GDG Constantine</strong></p>
                </div>
                
                <img src="cid:bottom" alt="Footer" style="width: 100%; display: block;" />
            </div>
        </body>
        </html>`
    )
}