'use client';

import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SettingsSection } from '@/features/settings/components/SettingsSection';
import { ToggleField } from '@/features/settings/components/ToggleField';
import { SelectField } from '@/features/settings/components/SelectField';
import { DiagnosticsRow } from '@/features/settings/components/DiagnosticsRow';
import { useUiStore } from '@/store/useUiStore';
import { useRealtimeStore } from '@/store/useRealtimeStore';
import { getSocket } from '@/lib/socket';
import { ActivityIcon, NetworkIcon, ShieldCheckIcon, TerminalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const AGENT_OPTIONS = [
  { label: 'Sarah (Support)', value: 'Sarah' },
  { label: 'Marcus (Dispatch)', value: 'Marcus' },
  { label: 'Alex (Logistics)', value: 'Alex' },
  { label: 'Olivia (Admin)', value: 'Olivia' },
];

export default function SettingsPage() {
  const { 
    compactMode, setCompactMode, 
    showActivityFeed, setShowActivityFeed,
    enableAnimations, setEnableAnimations 
  } = useUiStore();
  
  const { agentName, setAgentName, isConnected } = useRealtimeStore();
  
  // Need to handle client-side rendering for socket ID to prevent hydration mismatches
  const [socketId, setSocketId] = useState<string>('Connecting...');
  
  useEffect(() => {
    const socket = getSocket();
    if (socket.connected) {
      setSocketId(socket.id || 'Unknown');
    }
    
    const onConnect = () => setSocketId(socket.id || 'Unknown');
    const onDisconnect = () => setSocketId('Disconnected');
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Enterprise Settings</h1>
            <p className="text-sm text-slate-500 mt-1">Manage operations preferences, identity, and system configurations.</p>
          </div>
          
          <div className="space-y-6">
            {/* Operator Preferences */}
            <SettingsSection 
              title="Operator Identity" 
              description="Configure your active presence and operational role."
            >
              <SelectField 
                label="Active Agent Profile"
                description="Select your operational identity. This is broadcast to all users when you lock a ticket."
                value={agentName}
                options={AGENT_OPTIONS}
                onChange={setAgentName}
                toastMessage="Identity successfully updated"
              />
            </SettingsSection>

            {/* Dashboard Preferences */}
            <SettingsSection 
              title="Dashboard Preferences" 
              description="Customize the realtime operations interface."
            >
              <ToggleField 
                label="Compact Table Mode"
                description="Reduce padding in the ticket tables to see more operations at once."
                checked={compactMode}
                onChange={setCompactMode}
                toastMessage="Table density updated"
              />
              <ToggleField 
                label="Show Activity Feed"
                description="Display the realtime operations audit log in the dashboard."
                checked={showActivityFeed}
                onChange={setShowActivityFeed}
                toastMessage="Activity feed visibility updated"
              />
              <ToggleField 
                label="Enable UI Animations"
                description="Show smooth transitions for ticket lock events and charts."
                checked={enableAnimations}
                onChange={setEnableAnimations}
                toastMessage="Animation preferences updated"
              />
            </SettingsSection>

            {/* System Diagnostics */}
            <SettingsSection 
              title="System & Security Diagnostics" 
              description="Read-only view of your current connection and session details."
            >
              <DiagnosticsRow 
                label="Connection State" 
                icon={<NetworkIcon className="w-4 h-4" />}
                value={
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <span className={isConnected ? 'text-emerald-700' : 'text-red-700'}>
                      {isConnected ? 'Connected to Dispatch' : 'Disconnected'}
                    </span>
                  </div>
                } 
              />
              <DiagnosticsRow 
                label="Socket Session ID" 
                icon={<TerminalIcon className="w-4 h-4" />}
                value={socketId} 
              />
              <DiagnosticsRow 
                label="Realtime Synchronization" 
                icon={<ActivityIcon className="w-4 h-4" />}
                value={isConnected ? 'Active & Validated' : 'Suspended'} 
              />
              <DiagnosticsRow 
                label="System Version" 
                icon={<ShieldCheckIcon className="w-4 h-4" />}
                value="v0.1.0-alpha" 
              />
            </SettingsSection>
          </div>
        </div>
      </main>
    </>
  );
}
