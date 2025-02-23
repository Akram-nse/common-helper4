import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"

type Country = "South Africa" | "United Kingdom"
type EducationSystem = "matric" | "a-levels" | ""

const educationSystems: Record<Country, string[]> = {
  "South Africa": ["Matric", "A levels"],
  "United Kingdom": ["A levels"],
} as const

export function CountryPage() {
  const navigate = useNavigate()
  const [country, setCountry] = useState<Country | "">("")
  const [educationSystem, setEducationSystem] = useState<EducationSystem>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async () => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase
        .from('main')
        .insert([
          { 
            selected_system: educationSystem,
            gpa: null,
            subject_id_1: null,
            subject_id_2: null,
            subject_id_3: null,
            subject_id_4: null
          }
        ])
        .select()
        .single()

      if (error) throw error

      navigate('/documents', { 
        state: { 
          recordId: data.id,
          country, 
          educationSystem 
        } 
      })
    } catch (error) {
      console.error('Error creating record:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Select Your Country</h2>
          <Select onValueChange={(value) => setCountry(value as Country)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="South Africa">South Africa</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {country && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Education System</h2>
            <Select onValueChange={(value) => setEducationSystem(value as EducationSystem)}>
              <SelectTrigger>
                <SelectValue placeholder="Select education system" />
              </SelectTrigger>
              <SelectContent>
                {educationSystems[country].map((system) => (
                  <SelectItem 
                    key={system} 
                    value={system.toLowerCase().replace(" ", "-")}
                  >
                    {system}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          className="w-full"
          size="lg"
          disabled={!country || !educationSystem || isLoading}
          onClick={handleContinue}
        >
          {isLoading ? "Creating..." : "Continue"}
        </Button>
      </div>
    </div>
  )
} 