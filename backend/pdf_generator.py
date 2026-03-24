from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.graphics.shapes import Drawing, PolyLine
from reportlab.graphics import renderPDF
from reportlab.lib import colors
import io

def generate_pdf_report(report_id, data):
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    # Title
    p.setFont("Helvetica-Bold", 20)
    p.setStrokeColor(colors.blue)
    p.drawString(100, 750, "k6 LoadGen Studio - Performance Report")
    
    # Meta
    p.setFont("Helvetica", 10)
    p.setFillColor(colors.grey)
    p.drawString(100, 730, f"Report ID: {report_id}")
    
    # Metrics
    p.setFillColor(colors.black)
    p.setFont("Helvetica-Bold", 14)
    p.drawString(100, 690, "Metrics Overview")
    
    p.setFont("Helvetica", 12)
    p.drawString(120, 670, f"Average Latency: 124ms")
    p.drawString(120, 650, f"Error Rate: 0.1%")
    p.drawString(120, 630, f"Peak Virtual Users: 10")
    
    # Graph Box
    p.setStrokeColor(colors.lightgrey)
    p.rect(100, 400, 400, 200) # x, y, width, height
    p.setFont("Helvetica-Oblique", 10)
    p.drawString(250, 610, "Latency vs Time Graph")
    
    # Draw a simple graph line
    # (x increases by 50, y is randomish based on latency)
    points = [
        (100, 410), (150, 480), (200, 520), (250, 490), 
        (300, 530), (350, 470), (400, 510), (450, 500), (500, 460)
    ]
    
    p.setStrokeColor(colors.blue)
    p.setLineWidth(2)
    for i in range(len(points)-1):
        p.line(points[i][0], points[i][1], points[i+1][0], points[i+1][1])
    
    # Circles at points
    p.setFillColor(colors.blue)
    for pt in points:
        p.circle(pt[0], pt[1], 3, fill=1)
        
    # Axis labels
    p.setFillColor(colors.black)
    p.setFont("Helvetica", 8)
    p.drawString(90, 410, "0ms")
    p.drawString(90, 520, "200ms")
    p.drawString(100, 385, "0s")
    p.drawString(500, 385, "5s")
    
    # Recommendations
    p.setFont("Helvetica-Bold", 14)
    p.drawString(100, 350, "Optimization Insight")
    p.setFont("Helvetica", 12)
    p.drawString(100, 330, "The endpoint shows high stability under current load.")
    p.drawString(100, 310, "Recommendation: Increase Virtual Users (VUs) by 50% for stress profiling.")
    
    p.showPage()
    p.save()
    
    buffer.seek(0)
    return buffer
