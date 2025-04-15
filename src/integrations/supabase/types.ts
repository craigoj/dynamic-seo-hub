export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean | null
        }
        Insert: {
          created_at?: string
          id: string
          is_admin?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean | null
        }
        Relationships: []
      }
      city_content: {
        Row: {
          city: string
          content: Json
          created_at: string
          id: string
          meta_description: string
          meta_title: string
          state: string
          updated_at: string
        }
        Insert: {
          city: string
          content: Json
          created_at?: string
          id?: string
          meta_description: string
          meta_title: string
          state: string
          updated_at?: string
        }
        Update: {
          city?: string
          content?: Json
          created_at?: string
          id?: string
          meta_description?: string
          meta_title?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      industries: {
        Row: {
          content: string | null
          created_at: string
          description: string
          id: string
          meta_description: string
          meta_title: string
          name: string
          schema_markup: Json | null
          slug: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          description: string
          id?: string
          meta_description: string
          meta_title: string
          name: string
          schema_markup?: Json | null
          slug: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string
          id?: string
          meta_description?: string
          meta_title?: string
          name?: string
          schema_markup?: Json | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          city: string
          company: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          source_url: string
        }
        Insert: {
          city: string
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          source_url: string
        }
        Update: {
          city?: string
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          source_url?: string
        }
        Relationships: []
      }
      location_service_content: {
        Row: {
          benefits: Json | null
          city: string
          content: string
          created_at: string
          faqs: Json | null
          features: Json | null
          id: string
          meta_description: string
          meta_title: string
          schema_markup: Json | null
          service: string
          state: string
          updated_at: string
        }
        Insert: {
          benefits?: Json | null
          city: string
          content: string
          created_at?: string
          faqs?: Json | null
          features?: Json | null
          id?: string
          meta_description: string
          meta_title: string
          schema_markup?: Json | null
          service: string
          state: string
          updated_at?: string
        }
        Update: {
          benefits?: Json | null
          city?: string
          content?: string
          created_at?: string
          faqs?: Json | null
          features?: Json | null
          id?: string
          meta_description?: string
          meta_title?: string
          schema_markup?: Json | null
          service?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          city: string
          content: string
          created_at: string
          id: string
          meta_description: string
          meta_title: string
          schema_markup: Json | null
          state: string
          updated_at: string
        }
        Insert: {
          city: string
          content: string
          created_at?: string
          id?: string
          meta_description: string
          meta_title: string
          schema_markup?: Json | null
          state: string
          updated_at?: string
        }
        Update: {
          city?: string
          content?: string
          created_at?: string
          id?: string
          meta_description?: string
          meta_title?: string
          schema_markup?: Json | null
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_cache: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
          url: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          url: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      service_page_cache: {
        Row: {
          benefits: Json | null
          city: string
          content: string
          created_at: string
          faqs: Json | null
          features: Json | null
          id: string
          meta_description: string
          meta_title: string
          schema_markup: Json | null
          service: string
          updated_at: string
        }
        Insert: {
          benefits?: Json | null
          city: string
          content: string
          created_at?: string
          faqs?: Json | null
          features?: Json | null
          id?: string
          meta_description: string
          meta_title: string
          schema_markup?: Json | null
          service: string
          updated_at?: string
        }
        Update: {
          benefits?: Json | null
          city?: string
          content?: string
          created_at?: string
          faqs?: Json | null
          features?: Json | null
          id?: string
          meta_description?: string
          meta_title?: string
          schema_markup?: Json | null
          service?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
