'use client';

import { useState } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMessages } from '@/hooks/useMessages';
import { CreateConversationData } from '@/types';

interface StartConversationButtonProps {
  professionalId: number;
  professionalName: string;
  projectId?: number;
  initialMessage?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function StartConversationButton({
  professionalId,
  professionalName,
  projectId,
  initialMessage,
  className = '',
  variant = 'primary',
  size = 'md',
  showIcon = true,
}: StartConversationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { createConversation } = useMessages();

  const handleStartConversation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const conversationData: CreateConversationData = {
        participants: [professionalId],
        project: projectId,
        initial_message: initialMessage || `Hi ${professionalName}, I'd like to discuss my project with you.`,
      };

      const conversation = await createConversation(conversationData);
      
      // Navigate to messages page with the new conversation selected
      router.push(`/messages?conversation=${conversation.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start conversation');
      console.error('Error starting conversation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
  };

  const buttonClasses = `
    inline-flex items-center justify-center space-x-2 
    rounded-lg font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${className}
  `.trim();

  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';

  return (
    <div className="space-y-2">
      <button
        onClick={handleStartConversation}
        disabled={isLoading}
        className={buttonClasses}
      >
        {isLoading ? (
          <Loader2 className={`${iconSize} animate-spin`} />
        ) : (
          showIcon && <MessageSquare className={iconSize} />
        )}
        <span>
          {isLoading ? 'Starting...' : 'Start Conversation'}
        </span>
      </button>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}

// Specialized variants for common use cases
export function MessageProfessionalButton({
  professionalId,
  professionalName,
  projectId,
  className = '',
}: {
  professionalId: number;
  professionalName: string;
  projectId?: number;
  className?: string;
}) {
  return (
    <StartConversationButton
      professionalId={professionalId}
      professionalName={professionalName}
      projectId={projectId}
      variant="primary"
      size="md"
      className={className}
    />
  );
}

export function ContactProfessionalButton({
  professionalId,
  professionalName,
  initialMessage,
  className = '',
}: {
  professionalId: number;
  professionalName: string;
  initialMessage?: string;
  className?: string;
}) {
  return (
    <StartConversationButton
      professionalId={professionalId}
      professionalName={professionalName}
      initialMessage={initialMessage}
      variant="outline"
      size="sm"
      className={className}
    />
  );
}

export function QuickMessageButton({
  professionalId,
  professionalName,
  className = '',
}: {
  professionalId: number;
  professionalName: string;
  className?: string;
}) {
  return (
    <StartConversationButton
      professionalId={professionalId}
      professionalName={professionalName}
      variant="secondary"
      size="sm"
      showIcon={false}
      className={className}
    />
  );
}