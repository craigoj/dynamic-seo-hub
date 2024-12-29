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
      industries: {
        Row: {
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
