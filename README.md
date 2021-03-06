Δημιουργία ενός GraphQL server με τη χρήση dummy δεδομένων για το μάθημα της μηχανικής λογισμικού.
Ως πηγή δεδομένων, χρησιμοποιώ μία βάση sqlite με στοιχεία μιας αντιπροσωπίας αυτοκινήτων. 
Τα queries μπορούν να αντλήσουν δεδομένα σχετικά με αυτοκίνητα και πωλητές της αντιπροσωπίας. 
Τα mutations μπορούν να εισάγουν ένα αυτοκίνητο, να επεξεργαστούν ένα αυτοκίνητο με κλειδί το
id του αυτοκινήτου και τέλος να διαγράψουν ένα αυτοκίνητο με κλειδί το id του αυτοκινήτου ή
να διαγράψουν όλα τα αυτοκίνητα με minID<=carID <= maxID, δηλαδή όλα τα αυτοκίνητα που έχουν
id εντός δύο ορίων που δίνονται ως παράμετροι στο mutation, συμπεριλαμβανομένων των ορίων.

Για την υλοποίηση του server γίνεται χρήση του NodeJS μαζί με πακέτα για :
  1 - Δημιουργία GraphQL server
  2 - Δημιουργία http server με web ui (GraphIQL) για την διεπαφή με τον GraphQL server,
  3 - Διαχείριση της βάσης δεδομένων και 
  4 - Διαχείριση των GraphQL Schemas 