export type Status = 'Alive' | 'Dead' | 'unknown';
export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export interface Character {
  id:        number;
  name?:     string;
  status:    Status;
  species?:  string;
  type?:     string;
  gender:    Gender;
  origin?:   Location;
  location?: Location;
  image?:    string;
  episode?:  string[];
  url?:      string;
  created?:  Date;
}

export interface Location {
  name?: string;
  url?:  string;
}