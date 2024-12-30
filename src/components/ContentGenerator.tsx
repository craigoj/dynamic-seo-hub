import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface ContentGeneratorProps {
  onGenerated?: (content: any) => void;
  type?: 'custom' | 'service';
  defaultPrompt?: string;
  service?: string;
  city?: string;
  industry?: string;
}

export const ContentGenerator = ({ 
  onGenerated, 
  type = 'custom', 
  defaultPrompt = '',
  service,
  city,
  industry
}: ContentGeneratorProps) => {
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (type === 'custom' && !prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { 
          prompt, 
          type,
          service,
          city,
          industry
        },
      })

      if (error) throw error

      if (data.generatedText) {
        onGenerated?.(data.generatedText)
        toast({
          title: "Success",
          description: "Content generated successfully",
        })
      }
    } catch (error) {
      console.error('Error generating content:', error)
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Generator</CardTitle>
        <CardDescription>Generate content using AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {type === 'custom' && (
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        )}
        <div className="flex justify-end">
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}