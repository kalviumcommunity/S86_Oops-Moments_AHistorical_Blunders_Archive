import { useState } from "react"
import { motion } from "framer-motion"
import { History, Mail, Lock, ArrowRight, Github, Twitter, ChromeIcon as Google } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Link } from "react-router-dom"
import axios from "axios"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
      
        if (!email || !password) {
          setError("Please enter both email and password");
          return;
        }
      
        setIsLoading(true); 
      
        try {
          
          const response = await axios.post("http://localhost:5000/auth/login", {
            email,
            password,
          }, {
            withCredentials: true 
          });
      
         
          if (response.status == 200) {
            const token = response.data.token; 
            localStorage.setItem("token", token); 
            console.log("Token saved successfully:", token);
      
            window.location.href = "/history";
          } else {
            setError(response.data.message || "Invalid email or password"); 
          }
        } catch (err) {
          setError("An error occurred. Please try again."); 
          console.error("Error during login:", err);
        } finally {
          setIsLoading(false); 
        }
      };
      
  
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                  <History className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground mt-2">
                Sign in to continue your journey through history's funniest moments
              </p>
            </div>
  
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-card rounded-lg border shadow-sm p-6 md:p-8"
            >
              {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">{error}</div>}
  
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
  
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
  
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In <ArrowRight size={16} />
                    </span>
                  )}
                </Button>
              </form>
  
              
                
            </motion.div>
  
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
  
        
      </div>
    )
  }
  

export default LoginPage